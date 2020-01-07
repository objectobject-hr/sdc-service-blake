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

<<<<<<< HEAD:index.js
app.listen(PORT, () => console.log(`Connected to port ${PORT}\n`))
=======
app.get('/test', (req, res) => res.send('heyooo'))

http.get(process.env.PROXY + '/update', () => console.log('heyo'))

app.listen(PORT, () => console.log(`\nlistening on ${PORT}`))
>>>>>>> 5450e0d15c956035d05b86126f0ab7b1e9c9bc99:server/index.js
