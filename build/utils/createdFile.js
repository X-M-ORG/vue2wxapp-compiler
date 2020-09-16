const fs = require('fs')

function createdFile(path, content) {
  if (!content) {
    return
  }

  fs.existsSync(path) || mkdir(path)
  fs.writeFileSync(path, content, 'utf8', () => {})
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
