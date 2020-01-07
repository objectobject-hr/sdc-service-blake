require('dotenv').config()
require('../db')

const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, '../client/dist')))

for (const key in routes) {
  const route = key.substring(0, key.indexOf('.'))
  app.use('/' + route, routes[key])
}

app.listen(PORT, () => console.log(`Connected to port ${PORT}\n`))
