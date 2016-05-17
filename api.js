var express = require('express'),
    router = express.Router(),
    users = require('./users')

router.get('/users/:id', function (req, res) {
    users.getUser(req.params.id).then(function (json) {
        res.json(json)
    })
})

module.exports = router