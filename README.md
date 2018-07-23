# TestML

Repositorio con el código asociado al Test.

## Arquitectura

El test está desplegado mediante Google Cloud, en particular con App Engine en un ambiente flexible.

Al recibir una petición en el endpoint /mutant se analiza el DNA y se guarda el resultado en 
Google Cloud Datastore. 

Posteriormente, se actualiza en un Redis (Google Cloud Memorystore) segun corresponda el contador que lleva la cuenta de cuantos humanos y mutantes fueron detectados.

El endpoint /stats consulta los valores en Redis para responder.

## Ejecución

Para ejecutarlo en Google Cloud es necesario:

* Un proyecto en Google Cloud Platform.
* Configurar Google Cloud Datastore para que esté disponible.
* Una instancia de Google Cloud Memorystore.
* Descargar el código.
* Configurar en un archivo config.json el nombre del proyecto y los datos de conexión a Memorystore. Se puede ver el archivo config.example.json para más información.
* Descargar e instalar el SDK de Google Cloud: https://cloud.google.com/sdk/
* Desde linea de comandos, en el directorio del proyecto, ejecutar: npm install
* Desde linea de comandos, en el directorio del proyecto, ejecutar: gcloud app deploy

Se puede ejecutar también localmente mediante los siguientes pasos:

* Instalar Datastore Emulator: https://cloud.google.com/datastore/docs/tools/datastore-emulator
* Instalar un servidor de Redis: http://redis.io/
* Descargar el código.
* Configurar en un archivo config.json el nombre del proyecto y los datos de conexión a Memorystore. Se puede ver el archivo config.example.json para más información.
* Desde linea de comandos, en el directorio del proyecto, ejecutar: npm install
* Desde linea de comandos, en el directorio del proyecto, ejecutar: node app.js

## Endpoints

### POST /mutant

Para probar este endpoint, realizar un POST a /mutant con el DNA a analizar. Utilizar el siguiente formato en el body, con application/json.

`{ "dna": ["ATGT", "CAAC", "TACG", "AGAA"] }`

Ejemplo cURL:
`curl --request POST --url https://<proyecto>.appspot.com/mutant --header 'content-type: application/json' --data '{\n    "dna": ["ATGT", "CAAC", "TACG", "AGAA"]\n}'`

Response:
```
{
    "id": "9519",
    "count": 7
}
```

### GET /stats

Ejemplo cURL:
`curl --url https://<proyecto>.appspot.com/stats`

Response:
```
{
    "count_mutant_dna":100,
    "count_human_dna":100,
    "ratio":1
}
```

## Test

Para realizar test unitario, se puede utilizar el comando `npm run test`. Esto además deja en la carpeta /coverage un reporte de cobertura.

Se realizaron también tests mediante varias herramientas, para validar el comportamiento de la aplicación en un momento de carga.

Las herramientas utilizadas fueron:
 * Apache Benchmark
 * Siege. Se puede ver en la carpeta /test un documento con ejemplos del comando utilizado.
 * Artillery. También puede encontrarse un ejemplo de configuración en /test
 * blazemeter.com