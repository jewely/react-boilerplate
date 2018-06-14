const glob = require('glob')
const path = require('path')

const entry = {}

glob
  .sync(path.resolve(__dirname, '../src/pages/*.js?(x)'))
  .forEach(filePath => {
    const name = path.basename(filePath, path.extname(filePath)).toLowerCase()
    entry[name] = filePath
  })

function resolve(dir) {
  let base = '../'
  return dir.indexOf(base) === 0
    ? path.resolve(__dirname, dir)
    : path.resolve(__dirname, base, dir)
}

module.exports = {
  entry,
  resolve,
}
