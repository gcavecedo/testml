/**
 * @file app.js
 *
 * Punto de entrada para la App.
 * Levanta un servicio con los endpoints /mutant y /stats.
 *
 */
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const controller = require('./src/controller')
const config = require('./config')

app.use(bodyParser.json())

/**
 * Servicio de echo, para validación de funcionamiento.
 */
app.get('/', (req, res) => {
    res.send('Ok.')
})

/**
 * Servicio para anlizar DNA.
 */
app.post('/mutant', (req, res) => {
    controller.postMutant(req, res)
})

/**
 * Servicio que informa cuantos Mutantes y Humanos
 * fueron detectados.
 */
app.get('/stats', (req, res) => {
    controller.getStats(req, res)
})


/**
 * Iniciar el servicio.
 */
if (module === require.main) {
    const server = app.listen(config.get('PORT') || 8080, () => {
        const port = server.address().port
        console.log(`App listening on port ${port}`)
    })
}

module.export = app