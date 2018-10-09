var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        precoDe: {
            type: Number,
            required: true
        },
        precoPor: {
            type: Number,
            required: true
        },
        categorias: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Categoria'
        }],
        imagens: [String]
    });
    
    return mongoose.model('Produto', schema);
};