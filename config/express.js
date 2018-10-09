var express = require('express');

var load = require('express-load'); 

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var helmet = require('helmet');

module.exports = function() {
    var app = express();

    //environment variables
    const port = process.env.PORT || 3000;
    app.set('port', port);
    
    //Middlewares    
    //- Cookie Parser
    app.use(cookieParser());

    //- Express Session
    app.use(session({
        secret: 'ammo.api',
        resave: true,
        saveUninitialized: true
    }));

    //- Helmet
    //app.use(helmet());                                                    //Enables all security middlewares
    //app.disable('x-powered-by');                                          //Disable "Powered By" header
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));                 //Send wrong tecnology in "Powered By" header
    app.use(helmet.frameguard());                                           //Prevent page to open on iframe/frame tags
    app.use(helmet.xssFilter());                                            //Enable "X-XSS-Protection" header, XSS protection
    app.use(helmet.noSniff());                                              //Apply restriction to TAGS to only MIME-types
    //- Helmet FIM

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(require('method-override')());

    //routes, configs and assignments
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    //404
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });
    
    return app;
}