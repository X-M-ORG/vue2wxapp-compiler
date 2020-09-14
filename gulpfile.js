const gulp = require('gulp')
const watch = require('gulp-watch')

const fs = require('fs')

const pug = require('pug')
const stylus = require('stylus')
const sass = require('sass')

// 匹配标签内容
function matchTag(content, tag) {
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

// 创建文件
function createdFile(path, suffix, content) {
  if (!content) {
    return
  }

  const filePath = path.replace('.vue', suffix)
  fs.writeFile(filePath, content, 'utf8', () => {})
}

function compilerPage({ path, content }) {
  let { options, txt } = matchTag(content, 'page')
  if (!txt) {
    ;({ options, txt } = matchTag(content, 'template'))
  }

  switch (options.lang) {
    case 'pug': {
      const pageStr = pug.render(txt, { pretty: true })
      const { txt: wxml } = matchTag(pageStr, 'page')
      createdFile(path, '.wxml', wxml)
      break
    }

    default: {
      createdFile(path, '.wxml', txt)
    }
  }
}

function compilerStyle({ path, content }) {
  const { options, txt } = matchTag(content, 'style')

  switch (options.lang) {
    case 'stylus': {
      stylus.render(txt, (err, css) => {
        if (err) {
          throw err
        } else {
          createdFile(path, '.wxss', css)
        }
      })
      break
    }

    case 'sass':
    case 'scss': {
      sass.render({ data: txt, indentedSyntax: options.lang === 'sass' }, (err, result) => {
        if (err) {
          throw err
        } else {
          createdFile(path, '.wxss', result.css.toString())
        }
      })
      break
    }

    default: {
      createdFile(path, '.wxss', txt)
    }
  }
}

// 编译文件
function compiler(path, content) {
  createdFile(path, '.js', matchTag(content, 'script').txt)
  createdFile(path, '.json', matchTag(content, 'json').txt)

  compilerPage({ path, content })
  compilerStyle({ path, content })
}

gulp.task('default', () => {
  watch('**/*.vue', (file) => {
    if (file.event === 'change') {
      compiler(file.path, file.contents.toString())
    }
  })
})
