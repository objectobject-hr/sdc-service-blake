require('../db')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { Detail } = require('../db/models')

const app = express()

const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, '../client/dist')))

app.get('/details', ({ query }, res) => {
  Detail.find(query, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.post('/amenities', ({ body }, res) => {
  Detail.create(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.put('/amenities', ({ body }, res) => {
  Detail.updateOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.delete('/amenities', ({ body }, res) => {
  Detail.deleteOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

app.listen(port, () => console.log(`Connected to port ${port}`))
