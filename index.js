import nconf from 'nconf'
import Promise from 'bluebird'

import m from 'mongoose'
const mongoose = Promise.promisifyAll(m)

import app from './lib/app'

// ## //

nconf
    .argv()
    .file({ file: __dirname + '/config.json' })
    .defaults({
        environment: process.env.NODE_ENV || 'development',
        host: 'localhost',
        port: '5555',
        language: 'fr',
        urls: {
            base: 'http://localhost:5555',
        },
        cors: {
            origin: 'http://localhost:3333'
        },
        mongo: {
            uri: 'localhost/komon'
        }
    })

mongoose.connection.on('error', err => console.error(err))

mongoose.connectAsync(nconf.get('mongo:uri'))
    .then( res => {
        app.listen(nconf.get('port'), nconf.get('host'), () =>
            console.info(`api: web listening on ${nconf.get('host')}:${nconf.get('port')}`)
        )
    })
    .catch( err => {
        console.error(err)
        console.error('api: could not connect to sdk, exiting')
        process.exit(1)
    })
