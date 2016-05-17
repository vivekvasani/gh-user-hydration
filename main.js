var express = require('express'),
    app = express(),
    apiRouter = require('./api')

app.use('/api', apiRouter)

app.listen(9000)