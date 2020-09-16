const fs = require('fs')
const path = require('path')

const getHash = require('../utils/getHash')

const { cdnType, cdnMapFile } = require('../config')
const pushClient = require(`./${cdnType}`)

let cdnMap
try {
  cdnMap = require(`../../${cdnMapFile}`)
} catch (e) {
  cdnMap = {}
}

function getCdn() {
  fs.writeFileSync(path.join(__dirname, '../../', cdnMapFile), `module.exports = ${JSON.stringify(cdnMap)}`, 'utf8', () => {})
  return cdnMap
}

async function push(filePath) {
  try {
    const file = fs.readFileSync(path.join(__dirname, '../../', filePath))
    const md5 = getHash(file)

    if (cdnMap[filePath]) {
      return
    }

    if (cdnMap[md5]) {
      cdnMap[filePath] = cdnMap[md5]
    } else {
      const [suffix] = filePath.match(/\..*$/)
      cdnMap[filePath] = cdnMap[md5] = await pushClient(md5 + suffix, file)
      console.log('put:' + filePath)
    }
  } catch (e) {
    return
  }
}

module.exports = { push, getCdn }
