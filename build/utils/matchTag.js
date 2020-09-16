module.exports = function matchTag(content, tag) {
  const reg = new RegExp(`<${tag}(.*)>([\\\d\\\D]*)</${tag}>`)

  if (!content.match(reg)) {
    return { txt: '' }
  }

  let [, options, txt] = content.match(reg)
  options = options
    .trim()
    .split(' ')
    .reduce((opt, str) => {
      if (str) {
        const [key, value] = str.split('=')
        opt[key] = value.replace(/\"/g, '')
      }
      return opt
    }, {})

  if (options.lang === 'pug') {
    txt = txt.replace(/^\n/, '')
    const first = txt.match(/^(\s)*/)[0]
    if (first.length) {
      txt = 'template\n' + txt
    }
  } else {
    if (txt.match(/^\n(\s)*/)) {
      const first = txt.match(/^\n(\s)*/)[0]
      const reg2 = new RegExp(first.replace(/\n/, '\\n').replace(/\s/g, '\\s'), 'g')
      txt = txt.replace(reg2, '\n').replace(/^\n/, '')
    }
  }

  return { options, txt }
}
