/**
 * @file datastore.js
 *
 * Exporta un objeto con las funciones necesarias
 * para la comunicación con Google Cloud Datastore.
 *
 */
'use strict'

const Datastore = require('@google-cloud/datastore')
const config = require('../config')

const DATASTORE_KEY = 'mutant'

// Cliente para Google Cloud Datastore
const ds = Datastore({
    projectId: config.get('GCLOUD_PROJECT'),
    apiEndpoint: config.get('DATASTORE_API_ENDPOINT')
})


/** 
 * Traduce a un formato entendible para Google Cloud
 * Datastore. Obtenido desde:
 * https://github.com/GoogleCloudPlatform/nodejs-getting-started
 *
 * @param {obj} Objeto a traducir
 * @param {nonIndexed} Array con las propiedades que no deben tener indice
 * @return array of objects
 */
function toDatastore (obj, nonIndexed) {
    nonIndexed = nonIndexed || []
    const results = []
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            return
        }
        results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1
        })
    })
    return results
}

/** 
 * Crea un nuevo registro con la información pasada en
 * el parametro data.
 *
 * @param {data} Objeto a persistir
 * @return Promise
 */
function create (data) {
    return new Promise((resolve, reject) => {
        let key = ds.key(DATASTORE_KEY)

        const entity = {
            key: key,
            data: toDatastore(data, ['dna'])
        }

        ds.save(entity,
            (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(entity.key.id)
                }
            }
        );
    })
}

module.exports = {create}