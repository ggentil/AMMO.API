var mongoose = require('mongoose');
const POOL_SIZE = 15;

module.exports = function(uri){

    //debug
    mongoose.set('debug', true);

    mongoose.connect(uri, {
        useNewUrlParser: true, 
        poolSize: POOL_SIZE
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose! Desconectado pelo término da aplicação');

            // 0 indica que a finalização ocorreu sem erros
            process.exit(0);
        });
    });

    mongoose.connection.on('connected', function(){
        console.log('Mongoose! Conectado em ' + uri);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose! Disconectado de ' + uri);
    });

    mongoose.connection.on('error', function(err){
        console.log('Mongoose! Erro na conexão: ' + err);
    });
};