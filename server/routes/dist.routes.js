const express = require('express')
const { execSync } = require('child_process')
const fs = require('fs')

const router = express.Router()

router.get('/js', (req, res) => {
  execSync('webpack', { stdio: 'inherit' })
  const stream = fs.createReadStream('client/dist/bundle.js')
  const pipe = stream.pipe(res)
  pipe.on('finish', () => console.log('\nstreamed js file'))
})

router.get('/css', (req, res) => {
  const stream = fs.createReadStream('client/dist/style.css')
  const pipe = stream.pipe(res)
  pipe.on('finish', () => console.log('\nstreamed css file'))
})

module.exports = router
