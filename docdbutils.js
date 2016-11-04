
function getOrCreateDatabase(context, callback) {
    context.log('getOrCreateDatabase');
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id= @id',
        parameters: [{
            name: '@id',
            value: context.config.databaseId
        }]
    };
    context.client.queryDatabases(querySpec).toArray(function (err, results) {
        if (err) {
            callback(err);
        } else {
            if (results.length === 0) {
                var databaseSpec = {
                    id: context.config.databaseId
                };
                context.client.createDatabase(databaseSpec, function (err, created) {
                    callback(null, created);
                });
            } else {
                callback(null, results[0]);
            }
        }
    });
}

function getOrCreateCollection(context, databaseLink, callback) {
    context.log('getOrCreateCollection');
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: context.config.collectionId
        }]
    };             
    context.client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
        if (err) {
            callback(err);
        } else {        
            if (results.length === 0) {
                var collectionSpec = {
                    id: context.config.collectionId
                };
                context.client.createCollection(databaseLink, collectionSpec, function (err, created) {
                    callback(null, created);
                });
            } else {
                callback(null, results[0]);
            }
        }
    });
}

module.exports = {
    query: function (context, querySpec, callback) {
        getOrCreateDatabase(context, function(err, db) {
            getOrCreateCollection(context, db._self, function(err, coll) {
                context.log('query');
                context.client.queryDocuments(coll._self, querySpec).toArray(callback);
            });
        });
    },

    addItem: function (context, item, callback) {
        getOrCreateDatabase(context, function(err, db) {
            getOrCreateCollection(context, db._self, function(err, coll) {
                context.log('addItem');
                context.client.createDocument(coll._self, item, callback);
            });
        });
    },

    removeItem: function (context, itemId, callback) {
        getOrCreateDatabase(context, function(err, db) {
            getOrCreateCollection(context, db._self, function(err, coll) {
                context.log('removeItem');
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.id = @id',
                    parameters: [{
                        name: '@id',
                        value: itemId
                    }]
                };
                context.client.queryDocuments(coll._self, querySpec).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        context.client.deleteDocument(results[0]._self, callback);
                    }
                });
            });
        });
    },

    updateItem: function (context, item, callback) {
        getOrCreateDatabase(context, function(err, db) {
            getOrCreateCollection(context, db._self, function(err, coll) {
                context.log('updateItem');
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.id = @id',
                    parameters: [{
                        name: '@id',
                        value: item.Id
                    }]
                };
                context.client.queryDocuments(coll._self, querySpec).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        context.client.replaceDocument(results[0]._self, item, callback);
                    }
                });
            });
        });
    },

    getItem: function (context, itemId, callback) {
        getOrCreateDatabase(context, function(err, db) {
            getOrCreateCollection(context, db._self, function(err, coll) {
                context.log('getItem');
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.id = @id',
                    parameters: [{
                        name: '@id',
                        value: itemId
                    }]
                };
                context.client.queryDocuments(coll._self, querySpec).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, results[0]);
                    }
                });
            });
        });
    }
};
