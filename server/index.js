require('dotenv').config()
require('../db')

const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { Detail } = require('../db/models')

const app = express()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, '../client/dist')))

app.get('/details', ({ query }, res) => {
  Detail.findOne(query).exec((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.post('/details', ({ body }, res) => {
  Detail.create(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.put('/details', ({ body }, res) => {
  Detail.updateOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.delete('/details', ({ body }, res) => {
  Detail.deleteOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.listen(PORT, () => {
  mongoose.set('debug', true)
  console.log(`Connected to port ${PORT}`)
})
