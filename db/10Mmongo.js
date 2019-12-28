const cliProgress = require('cli-progress')
const fs = require('fs')
const createDetails = require('./createDetails')
const colors = require('colors')

const count = 10000000
const file = 'db/10M.json'
if (fs.existsSync(file)) fs.unlinkSync(file)
const bar = new cliProgress.SingleBar({
  format: `progress |${colors.cyan(
    '{bar}'
  )}| {percentage}% | {total} / {value} | {duration}s  `,
  barCompleteChar: `\u2588`,
  barIncompleteChar: '.'
})
bar.start(count, 0)
const stream = fs.createWriteStream(file)
stream.on('err', err => console.error(err))
stream.on('close', () => {
  bar.stop()
  console.log('finished writing')
})
bigWrite()

function bigWrite() {
  let i = count
  write()
  function write() {
    let ok = true
    do {
      i--
      if (i === 0) {
        stream.write(JSON.stringify(createDetails(i + 1)))
        stream.end()
      } else {
        ok = stream.write(JSON.stringify(createDetails(i + 1)) + '\n')
        bar.update(count - i + 1)
      }
    } while (i > 0 && ok)
    if (i > 0) {
      stream.once('drain', write)
    }
  }
}
