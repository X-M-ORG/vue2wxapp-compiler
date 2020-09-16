const crypto = require('crypto')

module.exports = function getHash(file) {
  return crypto.createHash('md5').update(file).digest('hex')
}
