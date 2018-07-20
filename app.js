const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const isMutant = require('./is-mutant.js')

app.use(bodyParser.json())

// [START testml]
app.get('/', (req, res) => {
    res.send('Ok.')
})

app.post('/mutant', (req, res) => {
    if (req.body.dna) {
        if (isMutant(req.body.dna)) {
            res.status(200)
            res.send()
        } else {
            res.status(403)
            res.send()
        }
    } else {
        console.log(res.body)
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