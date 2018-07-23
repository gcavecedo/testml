/**
 * @file config.js
 *
 * Obtiene las configuraciones desde diferentes fuentes.
 * Ver: 
 * https://github.com/GoogleCloudPlatform/nodejs-getting-started
 *
 */
 'use strict'

const nconf = module.exports = require('nconf')
const path = require('path')

/**
 * Obtener las configuraciones para la App.
 */
nconf
    // 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        'GCLOUD_PROJECT',
        'INSTANCE_CONNECTION_NAME',
        'NODE_ENV',
        'REDIS_HOST',
        'REDIS_PORT',
        'PORT'
    ])
    // 3. File
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. Defaults
    .defaults({
        // This is the id of your project in the Google Cloud Developers Console.
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379,
        PORT: 8080,
        DATASTORE_API_ENDPOINT: null
    });

// Check for required settings
checkConfig('GCLOUD_PROJECT');

function checkConfig (setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}
