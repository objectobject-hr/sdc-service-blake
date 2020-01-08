const db = require('../index')
const os = require('os')
const { execSync } = require('child_process')
const models = require('../models')
const count = require('../helpers/count')

const cpuCount = os.cpus().length

models.Detail.deleteMany({}, err => {
  if (err) console.error(err)
  else {
    console.log('deleted details')
    execSync(
      `mongoimport -d sdc -c details --file db/10M/10M.json --numInsertionWorkers ${cpuCount}`,
      { stdio: 'inherit' }
    )
    models.Counter.deleteMany({ id: 'details' }, err => {
      if (err) console.error(err)
      else {
        console.log('deleted details counter')
        models.Counter.create({ id: 'details', count: count }, err => {
          if (err) console.error(err)
          db.close()
        })
      }
    })
  }
})
