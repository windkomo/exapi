import nconf from 'nconf'
import express from 'express'
import errorHandler from 'errorhandler'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import cors from 'cors'

import v1 from './v1'

// ## //

const env = nconf.get('environment')
const app = express()

app.set('port', nconf.get('port'))
app.set('host', nconf.get('host'))
app.set('trust proxy', true)
app.set('etag', 'strong')

app.use(cors({
    origin: nconf.get('cors:origin'),
    credentials: true
}))

if (env === 'development') {
    app.use(morgan('dev'))
    app.use(
        errorHandler({
            dumpExceptions: true,
            showStack: true
        })
    )
}

else if (env === 'production') {
    morgan.token('user', req => {
        if (req.user) {
            return req.user.username
        }
    })

    morgan.token('application', req => {
        if (req.application) {
            return req.application.name
        }
    })

    app.use(morgan([
        ':remote-addr - :remote-user [:date[clf]]',
        '":method :url HTTP/:http-version" :status',
        ':res[content-length] ":referrer" ":user-agent"',
        '":user" ":application"'
    ].join(' ')))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())

v1.useOn(app)

// ## //

export default app
