var express = require('express');
var router = express.Router();
var url = require('./shortenerModel');

router.get('/:code', function (req, res, next) {
    url.getUrl(req.params.code).then(result => {
        if (result.length > 0)
            res.redirect(result[0].original_url);
        else
            res.send({error: "url code doesn't exist or url is not visitable."})
    });
});
router.get('/:code/edit', function (req, res, next) {
    url.getUrl(req.params.code).then(result => {
        if (result.length > 0)
            res.render('edit', {url: result[0].original_url,code:result[0].code});
        else
            res.send({error: "url code doesn't exist or url is not visitable."})
    });

});


module.exports = router;
