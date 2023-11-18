const { createServer: createHttpsServer } = require('https')
const next = require('next')
const fs = require('fs')
const chalk = require('chalk')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000

app
    .prepare()
    .then(() => {
        const server = createHttpsServer(
            {
                key: fs.readFileSync('./certs/privkey.pem'),
                cert: fs.readFileSync('./certs/fullchain.pem'),
            },
            (req, res) => handle(req, res)
        )
        return server.listen(PORT, (err) => {
            if (err) throw err
            console.log('> Ready on https://data.atellix.net:3000')
        })
    })
    .catch((err) => {
        console.error(err)
    })

