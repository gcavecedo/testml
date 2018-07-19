'use strict';

var isMutant = require('./is-mutant.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

// [START testml]
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
// [END testml]

if (module === require.main) {
    // [START server]
    // Start the server
    const server = app.listen(process.env.PORT || 8080, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    });
    // [END server]
}

module.export = app