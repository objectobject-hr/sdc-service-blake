const fs = require('fs')
const createDetails = require('./helpers/createDetails')
const cliProgress = require('cli-progress')
const colors = require('colors')

const count = 10
const file = 'db/10M.csv'
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
let i = count
write()
function write() {
  let ok = true
  do {
    i--
    if (i === 0) {
      stream.write(createString(i))
      stream.end()
    } else {
      ok = stream.write(createString(i) + '\n')
      bar.update(count - i + 1)
    }
  } while (i > 0 && ok)
  if (i > 0) {
    stream.once('drain', write)
  }
}

function createString(i) {
  const data = createDetails(i + 1)
  let string = `${data.listing_ID}`
  string += `\t${data.propertyType}`
  string += `\t${JSON.stringify(data.overview)}`
  string += `\t${JSON.stringify(data.amenities)}`
  string += `\t${JSON.stringify(data.houseRules)}`
  const tags = JSON.stringify(data.tags)
  const cut = tags.substring(1, tags.length - 1)
  const braces = '{' + cut + '}'
  string += `\t${braces}`
  return string
}
