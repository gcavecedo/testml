var isMutant = require('./is-mutant.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/mutant', function (req, res) {
    if (req.body.dna) {
        if (isMutant(req.body.dna)) {
            res.status(200)
            res.send()
        } else {
            res.status(403)
            res.send()
        }
    } else {
        res.status(400)
        res.send('Bad request.')
    }
})

app.listen(3000, function () {
    console.log('App listening on port 3000!');
})