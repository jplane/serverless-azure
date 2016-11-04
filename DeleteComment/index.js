
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../config.js');
var ddbutils = require('../docdbutils.js');

var client = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

module.exports = function(context, req) {
    context.log('DeleteComment');
    context.client = client;
    context.config = config;
    if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body);
    }
    ddbutils.removeItem(context, req.body.id, function(err) {
        if (err) {
            context.log(err);
            context.res = {
                status: 500,
                body: err
            };
            context.done();
        } else {
            var querySpec = {
                query: 'SELECT * FROM root r'
            };
            ddbutils.query(context, querySpec, function (err, items) {
                if (err) {
                    context.log(err);
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
        }
    });
};
