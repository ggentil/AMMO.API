var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://ggentil:ammo25@ds225253.mlab.com:25253/ammo';

MongoClient.connect(url, function(err, client){
    if (err) console.log('err: ', err);
    if (client) console.log('client: ', client);
});