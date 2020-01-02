const cliProgress = require('cli-progress')
const fs = require('fs')
const createDetails = require('./helpers/createDetails')
const colors = require('colors')
const { execSync } = require('child_process')
const os = require('os')
const { Counter } = require('./models')

let loaded = 0
loadRecords()

function loadRecords() {
  const file = 'db/1M.json'
  if (fs.existsSync(file)) fs.unlinkSync(file)
  const bar = new cliProgress.SingleBar({
    format: `progress |${colors.cyan(
      '{bar}'
    )}| {percentage}% | {total} / {value} | {duration}s  `,
    barCompleteChar: `\u2588`,
    barIncompleteChar: '.'
  })
  const count = 1000000
  console.log('\n')
  bar.start(count, 0)

  const stream = fs.createWriteStream(file)
  stream.on('err', err => console.error(err))

  let i = 0

  write()

  function write() {
    let ok = true
    for (i; i < count; i++) {
      if (ok) {
        if (i === count - 1) {
          ok = stream.write(JSON.stringify(createDetails(i + 1)), () => {
            bar.stop()
            stream.end()
            const cpuCount = os.cpus().length
            console.log('\n')
            execSync(
              `mongoimport -d sdc -c details --file db/1M.json --numInsertionWorkers ${cpuCount}`,
              { stdio: 'inherit' }
            )
            loaded++
            console.log('\nLoaded ' + loaded)
            if (loaded < 2) loadRecords()
            else {
              const db = require('./index')
              db.on('open', () => {
                Counter.deleteMany({ id: 'details' }, err => {
                  if (err) console.error(err)
                  else {
                    Counter.create({ id: 'details', count: 10000000 }, err => {
                      if (err) console.error(err)
                      db.close()
                      console.log('\ndone')
                    })
                  }
                })
              })
            }
          })
        } else {
          ok = stream.write(JSON.stringify(createDetails(i + 1)) + '\n', () => {
            bar.update(i)
          })
        }
      } else {
        stream.once('drain', write)
        break
      }
    }
  }
}
