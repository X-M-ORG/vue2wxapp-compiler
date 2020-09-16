const aliOss = require('ali-oss')

const { assets2cdn, cdnDirname, aliOss: config } = require('../config')

const ossClient = assets2cdn ? new aliOss(config) : null

module.exports = async function push(fileName, file) {
  if (!ossClient) {
    return
  }

  const res = await ossClient.put(cdnDirname + `/${fileName}`, file)
  return res.url
}
