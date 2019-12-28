const express = require('express')
const { Detail, Counter } = require('../../db/models')

const router = express.Router()

router.get('/', ({ query }, res) => {
  Detail.findOne(query).exec((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

router.post('/', async ({ body }, res) => {
  try {
    const counter = await Counter.findOne({ id: 'details' })
    counter.count++
    await Detail.create({ ...body, listing_ID: counter.count })
    console.log(`detail ${counter.count} created`)
    await counter.save()
    console.log(`counter updated to ${counter.count}\n`)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
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
