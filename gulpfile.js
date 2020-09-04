const gulp = require('gulp')
const watch = require('gulp-watch')

const fs = require('fs')
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

  if (txt.match(/^\n(\s)*/)) {
    let first = txt.match(/^\n(\s)*/)[0]
    let reg2 = new RegExp(first.replace(/\n/, '\\n').replace(/\s/g, '\\s'), 'g')
    txt = txt.replace(reg2, '\n').replace(/^\n/, '')
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

// 编译文件
function compiler(path, content) {
  const wxss = matchTag(content, 'style')

  createdFile(path, '.wxml', matchTag(content, 'page').txt)
  createdFile(path, '.js', matchTag(content, 'script').txt)
  createdFile(path, '.json', matchTag(content, 'json').txt)

  switch (wxss.options.lang) {
    case 'stylus': {
      stylus.render(wxss.txt, function (err, css) {
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
      sass.render({ data: wxss.txt, indentedSyntax: wxss.options.lang === 'sass' }, function (err, result) {
        if (err) {
          throw err
        } else {
          createdFile(path, '.wxss', result.css.toString())
        }
      })
      break
    }

    default: {
      createdFile(path, '.wxss', wxss.txt)
    }
  }
}

gulp.task('default', function () {
  watch('**/*.vue', function (file) {
    if (file.event === 'change') {
      compiler(file.path, file.contents.toString())
    }
  })
})
