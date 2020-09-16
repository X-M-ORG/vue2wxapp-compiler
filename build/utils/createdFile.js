const fs = require('fs')
const path = require('path')

function createdFile(savePath, content) {
  if (!content) {
    return
  }

  fs.existsSync(savePath) || mkdir(savePath)
  fs.writeFileSync(savePath, content, 'utf8', () => {})
}
function mkdir(filePath) {
  let basePath = path.resolve(__dirname, '../../')

  const paths = filePath.replace(basePath, '').split('/').filter(Boolean)
  paths.pop()

  for (let path of paths) {
    basePath += '/' + path
    fs.existsSync(basePath) || fs.mkdirSync(basePath)
  }
}

module.exports = createdFile
