const fs = require('fs')
const path = require('path')
const Chokidar = require('chokidar')

const compiler = require('./compiler')

const watcher = Chokidar.watch([path.join(__dirname, '../**/*.vue')], {
  persistent: true,
  usePolling: true
})

watcher
  .on('ready', () => {
    console.log('Start listening for.vue files.')
  })
  .on('change', (path) => {
    compiler(path, fs.readFileSync(path).toString())
  })
