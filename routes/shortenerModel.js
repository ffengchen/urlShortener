var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://fengchen:123@cluster0-0lpae.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");


var urlSchema = new mongoose.Schema({
    code: String,
    original_url: String,
});

var model = mongoose.model("url", urlSchema);

function createUrl(code, original_url) {
    return new Promise(function (resolv, reject) {
        model.create({code, original_url}, function (error, record) {
            if (error) {
                reject(error)
            } else {
                resolv(record);
            }
        });
    });
}

function updateUrl(code, data) {
    return new Promise(function (resolv, reject) {
        model.updateOne({code: code}, {$set: data}, function (error, record) {
            if (error) {
                reject(error)
            } else {
                resolv(record);
            }
        });
    });
}

function deleteUrl(code) {
    return new Promise(function (resolv, reject) {
        model.remove({code: code}, function (error, record) {
            if (error) {
                reject(error)
            } else {
                resolv(record);
            }
        });
    });
}

function getUrl(code) {
    return new Promise(function (resolv, reject) {
        model.find({code: code}, function (error, record) {
            if (error) {
                reject(error)
            } else {
                resolv(record);
            }
        });
    });
}


exports.getUrl = getUrl;
exports.deleteUrl = deleteUrl;
exports.createUrl = createUrl;
exports.updateUrl = updateUrl;

