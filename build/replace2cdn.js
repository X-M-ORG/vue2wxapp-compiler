const { push, getCdn } = require('./push')
const { assets2cdn } = require('./config')

async function replace2cdn(content, regStr) {
  const reg1 = new RegExp(regStr)
  const reg2 = new RegExp(regStr, 'g')

  const strs = content.match(reg2)

  if (strs) {
    const pushPaths = [...new Set(strs.map((i) => i.match(reg1)[1]))]
    await Promise.all(pushPaths.map(push))
  }

  const cdn = getCdn()

  return content.replace(reg2, (str, path) => str.replace(path, cdn[path] || path))
}

function src2cdn(content) {
  return assets2cdn ? replace2cdn(content, '<image.*?src="(.*)".*?>[\\d\\D]*?<\\/image>') : content
}
function url2cdn(content) {
  return assets2cdn ? replace2cdn(content, 'url\\("(.*?)"\\)') : content
}

module.exports = { replace2cdn, src2cdn, url2cdn }
