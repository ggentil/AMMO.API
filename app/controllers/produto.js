var util = require('../services/util');
var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    let controller = {};
    let utilService = new util();
    let Produto = app.models.produto;

    controller.listaProdutos = function(req, res) {
        let pagina = req.params.pagina,
            qtdePagina = req.params.qtdePagina,
            termo = req.params.termo,
            skip = qtdePagina * (pagina - 1),
            find = termo ? { "nome": new RegExp(termo, "i") } : {};
        

        Produto.countDocuments(find).exec()
            .then(function(qtdeProdutos){
                Produto.find(find).skip(skip).limit(parseInt(qtdePagina)).populate('categorias', {"nome": 1}).exec()
                    .then(function(produtos){
                        let resposta = {
                            produtos: produtos,
                            total: qtdeProdutos
                        }
                        res.json(utilService.throwDefaultResponse(true, null, resposta));
                    }, function(erro) {
                        console.log(erro);
                        res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar produtos.", erro));
                    });
            }, function(erro) {
                console.log(erro);
                qtdeProdutos = null;
            });
    };

    controller.obtemProduto = function(req, res) {
        let _id = req.params.id;
        
        if(_id) {
            Produto.findById(_id).populate('categorias', {"nome": 1}).exec()
                .then(function(produto){
                    if (!produto) throw new Error("Produto não encontrado.");
                    res.json(utilService.throwDefaultResponse(true, null, produto));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar o produto.", erro));
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.removeProduto = function(req, res) {
        let _id = sanitize(req.params.id);
        
        if(_id) {
            Produto.remove({"_id": _id}).exec()
                .then(function(){
                    res.json(utilService.throwDefaultResponse(true, null, null));
                }, function(erro) {
                    return console.error(erro);
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.salvaProduto = function(req, res) {
        var _id = req.body._id;
        var dados = {
            "nome": req.body.nome,
            "precoDe": req.body.precoDe,
            "precoPor": req.body.precoPor,
            "categorias" : req.body.categorias || null,
            "imagens" : req.body.imagens || null
        }

        if(_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(function(produto) {
                    res.json(utilService.throwDefaultResponse(true, null, produto));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao atualizar produto.", erro));
                })
        } else {
            Produto.create(dados)
                .then(function(produto) {
                    res.status(201).json(utilService.throwDefaultResponse(true, null, produto));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao registrar produto.", erro));
                });
        }
    };

    return controller;
}