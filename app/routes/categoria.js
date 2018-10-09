module.exports = function(app) {
    var controller = app.controllers.categoria;
    
    app.route('/categorias')
        .get(controller.listaCategorias)
        .post(controller.salvaCategoria);

    app.route('/categorias/:id')
        .get(controller.obtemCategoria)
        .delete(controller.removeCategoria);
}