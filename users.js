var Promise = require('bluebird'),
    request = require('request')

function getUser (id) {
    return new Promise(function (resolve, reject) {
        requestJSON('https://api.github.com/users/' + id, function (err, user) {
            user.repos = mapUrl(user.repos_url)
            user.followers = mapUrl(user.followers_url)
            Promise.props(user).then(function (result) {
                resolve(result)
            })
        })
    })
}

function mapUrl (url) {
    return Promise.promisify(requestJSON)(url)
}

function requestJSON (url, cb) {
        request({url: url, headers: {'User-Agent': 'request'}}, function (err, response, body) {
            if (err) cb()
            cb(null, parseJSON(body))
        })
    }

function parseJSON (jsonText) {
    var json

    try {
        json = JSON.parse(jsonText)
    } catch (e) {
        json = { error: e }
    }

    return json
}

module.exports = {
    getUser
}