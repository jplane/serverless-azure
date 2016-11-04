
var config = {}

config.host = process.env.HOST;
config.authKey = process.env.AUTH_KEY;
config.databaseId = process.env.DATABASE;
config.collectionId = process.env.COLLECTION;

module.exports = config;
