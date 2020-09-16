const path = require('path')

const { outputPath, codePath } = require('./config')
const createdFile = require('./utils/createdFile')

const rootPath = path.resolve(__dirname, '../')

module.exports = function create(path, suffix, content) {
  let filePath = path.replace('.vue', suffix)

  if (outputPath && codePath && outputPath !== codePath) {
    filePath = filePath.replace(`${rootPath}/${codePath}`, `${rootPath}/${outputPath}`)
  }

  return createdFile(filePath, content)
}
