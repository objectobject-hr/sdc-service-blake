const express = require('express')
const { Detail, Counter } = require('../db/models')
const _ = require('lodash')

const router = express.Router()

router.get('', ({ query }, res) => {
  Detail.findOne(query).lean().exec((err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

router.post('', async ({ body }, res) => {
  try {
    const counter = await Counter.findOne({ id: 'details' })
    counter.count++
    await Detail.create({ ...body, listing_ID: counter.count })
    await counter.save()
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

router.put('', async ({ body }, res) => {
  try {
    const doc = await Detail.findOne({ listing_ID: body.listing_ID })
    _.assign(doc, body)
    await doc.save()
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

router.delete('', ({ body }, res) => {
  Detail.deleteOne(body, (err, data) => {
    if (err) console.error(err)
    else res.send(data)
  })
})

module.exports = router
