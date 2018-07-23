/**
 * @file counter.js
 *
 * Expone servicios para comunicarse con Redis. Se 
 * proveen funciones para obtener los contadores y
 * para incrementarlos. Dichos contadores representan
 * la cantidad de mutantes y humanos detectados.
 *
 */
 'use strict'


const redis = require('redis')
const config = require('../config')

const MUTANT = 'mutant'
const HUMAN = 'human'

/**
 * Instancia de cliente para Redis.
 */
const client = redis.createClient(config.get('REDIS_PORT'), config.get('REDIS_HOST'))

client.on('error', (err) => console.error('ERR:REDIS:', err))

/**
 * Ejecuta un comando Redis unario, es decir,
 * sólo utiliza la key.
 *
 * @param {command} String, comando a ejecutar
 * @param {key} String
 * @return Promise
 */
function redisCommand(command, key) {
    return new Promise((resolve, reject) => {
        client[command](key, (error, value) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(value)
            }
        })
    })
}

/**
 * Devuelve una promesa, que al cumplirse resulta
 * en la cantidad de mutantes y humanos.
 *
 * @return Promise
 */
function getCounts() {
    return Promise.all([
        redisCommand('get', MUTANT),
        redisCommand('get', HUMAN)
    ])
}

/**
 * Incrementa la cantidad de Humanos/Mutantes detectados.
 *
 * @param {kind} String, pueden ser las constantes HUMAN o MUTANT
 * @return Promise
 */
function incrementCounter(kind) {
    return redisCommand('incr', kind)
}

module.exports = {
    getCounts,
    incrementCounter,
    MUTANT,
    HUMAN
}
