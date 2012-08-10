var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

exports.schemaList = {
    product:new mongoose.Schema({
        name: String
    }),

    history:new mongoose.Schema({
        record: String
    })
};

exports.query = function (conditions, tableName, schema, sort, callback) {
    var table = mongoose.model(tableName, schema, tableName);
    table.find(conditions,null, sort, callback);
}


exports.insert = function (data, tableName, schema, callback) {
    var table = mongoose.model(tableName, schema, tableName);
    table.create(data, callback);
}


exports.del = function (conditions, tableName, schema, callback) {
    var table = mongoose.model(tableName, schema, tableName);
    table.remove(conditions, callback);
}

