var express = require('express');
var router = express.Router();
var url = require('./shortenerModel');

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

router.post('/add', function (req, res, next) {
    let code = req.body.code || randomString(5);
    let original_url = req.body.original_url;
    url.getUrl(code).then(result => {
        if (result.length > 0) {
            res.json({"error": "Brand already exists"})
        } else {
            url.createUrl(code, original_url).then(result => {
                res.json({"data": result})
            })
        }
    })
});


router.post('/delete', function (req, res, next) {
    let code = req.body.code;
    url.deleteUrl(code).then(result => {
        res.json({"success": "1"});
    })

});
router.post('/update', function (req, res, next) {
    let code = req.body.code;
    let n_code = req.body.n_code;
    let original_url = req.body.original_url;
    let data = {
        code: n_code, original_url
    };

    url.updateUrl(code, data).then(result => {
        res.json({"success": "1"});
    })

});
module.exports = router;
