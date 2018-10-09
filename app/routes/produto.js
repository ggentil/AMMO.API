module.exports = function(app) {
    var controller = app.controllers.produto;
    
    app.route('/produtos/:qtdePagina?/:pagina?/:termo?')
        .get(controller.listaProdutos)
        .post(controller.salvaProduto);

    app.route('/produtos/:id')
        .get(controller.obtemProduto)
        .delete(controller.removeProduto);
}