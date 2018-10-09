var util = require('../services/util');
var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    let controller = {};
    let utilService = new util();
    let Categoria = app.models.categoria;

    controller.listaCategorias = function(req, res) {
        let totalCategorias;

        Categoria.countDocuments().exec()
            .then(function(categorias){
                totalCategorias = categorias;
            }, function(erro) {
                console.log(erro);
                totalCategorias = null;
            });

        Categoria.find({}, {"nome": 1}).exec()
            .then(function(categorias){
                let resposta = {
                    categorias: categorias,
                    total: totalCategorias
                }
                res.json(utilService.throwDefaultResponse(true, null, resposta));
            }, function(erro) {
                console.log(erro);
                res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar categorias.", erro));
            });
    };

    controller.obtemCategoria = function(req, res) {
        let _id = req.params.id;
        
        if(_id) {
            Categoria.findById(_id, {"nome": 1}).exec()
                .then(function(categoria){
                    if (!categoria) throw new Error("Categoria não encontrado.");
                    res.json(utilService.throwDefaultResponse(true, null, categoria));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar a categoria.", erro));
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.removeCategoria = function(req, res) {
        let _id = sanitize(req.params.id);
        
        if(_id) {
            Categoria.remove({"_id": _id}).exec()
                .then(function(){
                    res.json(utilService.throwDefaultResponse(true, null, null));
                }, function(erro) {
                    return console.error(erro);
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.salvaCategoria = function(req, res) {
        var _id = req.body._id;
        var dados = {
            "nome": req.body.nome
        }

        if(_id) {
            Categoria.findByIdAndUpdate(_id, dados).exec()
                .then(function(categoria) {
                    res.json(utilService.throwDefaultResponse(true, null, categoria));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao atualizar categoria.", erro));
                })
        } else {
            Categoria.create(dados)
                .then(function(categoria) {
                    res.status(201).json(utilService.throwDefaultResponse(true, null, categoria));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao registrar categoria.", erro));
                });
        }
    };

    return controller;
}