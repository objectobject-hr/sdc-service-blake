require('dotenv').config()
const fs = require('fs')
const { Pool } = require('pg')
const copyFrom = require('pg-copy-streams').from
const path = require('path')
const cliProgress = require('cli-progress')

const bar = new cliProgress.SingleBar()
const file = path.join(__dirname, 'db', '10M.csv')
const pool = new Pool()

pool.connect(function(err, client, done) {
  if (err) return console.error(err)
  pool.query('delete from details', err => {
    if (err) return console.error(err)
    const stream = client.query(copyFrom('COPY details FROM STDIN'))
    const fileStream = fs.createReadStream(file)
    const CSVsize = fs.statSync(file).size
    bar.start(CSVsize, 0)
    let count = 0
    fileStream.on('data', data => {
      count += Buffer.byteLength(data)
      bar.update(count)
    })
    fileStream.on('error', err => {
      console.error(err)
      done()
    })
    stream.on('error', err => {
      console.error(err)
      done()
    })
    stream.on('end', () => {
      bar.stop()
      console.log('done')
      done()
      pool.end()
    })
    fileStream.pipe(stream)
  })
})
