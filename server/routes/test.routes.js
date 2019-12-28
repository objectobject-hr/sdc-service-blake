var express = require('express')
var router = express.Router()

router.get('/', ({ query }, res) => {
  Detail.findOne(query).exec((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

router.post('/', ({ body }, res) => {
  Detail.create(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

router.put('/', ({ body }, res) => {
  Detail.updateOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

router.delete('/', ({ body }, res) => {
  Detail.deleteOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

module.exports = router
