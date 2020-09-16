const aliOss = require('ali-oss')

const { cdnDirname, aliOss: config } = require('../config')
const ossClient = new aliOss(config)

module.exports = async function push(fileName, file) {
  const res = await ossClient.put(cdnDirname + `/${fileName}`, file)
  return res.url
}
