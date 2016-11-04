
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../config.js');
var ddbutils = require('../docdbutils.js');

var client = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

module.exports = function(context) {
    context.log('GetComments');
    context.client = client;
    context.config = config;
    var querySpec = {
        query: 'SELECT * FROM root r'
    };
    ddbutils.query(context, querySpec, function (err, items) {
        if (err) {
            context.res = {
                status: 500,
                body: err
            };
        } else {
            if (items === null) {
                items = [];
            }
            context.res = {
                body: items
            };
        }
        context.done();
    });
};