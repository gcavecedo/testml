/**
 * @file controller.js
 *
 * Provee las funciones necesarias para atender
 * las peticiones de los clientes al servicio.
 *
 */
'use strict'


const isMutant = require('./is-mutant')
const counter = require('./counter')
const datastore = require('./datastore')

/**
 * Endpoint POST /mutant
 *
 * Verifica si el DNA dado es mutante, almacena el
 * resultado junto al DNA e incrementa el contador
 * correspondiente para las estadísticas.
 *
 * @param {req} Objecto Request de Express
 * @param {res} Objecto Response de Express
 */
function postMutant(req, res) {
    try {
        if (!req.body.dna) {
            console.log(res.body)
            res.status(400).send('Bad request.')
            return
        }

        let ism = isMutant(req.body.dna)
        
        datastore.create({
            isMutant: ism,
            dna: req.body.dna
        })
        .then((datastoreId) => {
            counter.incrementCounter(ism ? counter.MUTANT : counter.HUMAN)
            .then((count) => {
                res.status(ism ? 200 : 403).send({id: datastoreId, count})
            }).catch((error) => {
                res.status(500).send({message: 'Redis error', error})
            })
        })
        .catch((error) => {
            res.status(500).send({message: 'Storage error', error})
        })
    } catch(e) {
        res.status(500).send(e)
    }
}

/**
 * Endpoint GET /stats
 *
 * Obtiene las estadisticas e informa cuántos DNA
 * mutantes y cuantos humanos se analizaron.
 * Informa además el ratio Mutantes / Humanos.
 *
 * @param {req} Objecto Request de Express
 * @param {res} Objecto Response de Express
 */
function getStats(req, res) {
    try {
        counter.getCounts()
        .then((counts) => {
            res.status(200).send({
                count_mutant_dna: Number(counts[0]),
                count_human_dna: Number(counts[1]),
                ratio: counts[1] > 0 ? counts[0] / counts[1] : 0
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Redis error',
                error
            })
        })
    } catch(e) {
        res.status(500).send(e)
    }
}

module.exports = {
    postMutant,
    getStats
}