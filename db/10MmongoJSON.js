const cliProgress = require('cli-progress')
const fs = require('fs')
const createDetails = require('./helpers/createDetails')
const colors = require('colors')
const count = require('./helpers/count')

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

let i = 0

write()

function write() {
  let ok = true
  for (i; i < count; i++) {
    if (ok) {
      if (i === count - 1) {
        ok = stream.write(JSON.stringify(createDetails(i + 1)))
        bar.update(i + 1)
        stream.end()
      } else {
        ok = stream.write(JSON.stringify(createDetails(i + 1)) + '\n')
        bar.update(i + 1)
      }
    } else {
      stream.once('drain', write)
      break
    }
  }
}
