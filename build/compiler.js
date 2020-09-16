/*
  编译
*/
const pug = require('pug')
const stylus = require('stylus')
const sass = require('sass')

const createdFile = require('./create')
const matchTag = require('./utils/matchTag')
const { src2cdn, url2cdn } = require('./replace2cdn')

function compiler(path, content) {
  createdFile(path, '.js', matchTag(content, 'script').txt)
  createdFile(path, '.json', matchTag(content, 'json').txt)

  compilerPage({ path, content })
  compilerStyle({ path, content })
}
async function compilerPage({ path, content }) {
  let { options, txt } = matchTag(content, 'page')
  if (!txt) {
    ;({ options, txt } = matchTag(content, 'template'))
  }

  switch (options.lang) {
    case 'pug': {
      const pageStr = pug.render(txt, { pretty: true })
      const { txt: wxml } = matchTag(pageStr, 'page')
      createdFile(path, '.wxml', await src2cdn(wxml))
      break
    }

    default: {
      createdFile(path, '.wxml', await src2cdn(txt))
    }
  }
}
async function compilerStyle({ path, content }) {
  const { options, txt } = matchTag(content, 'style')

  switch (options.lang) {
    case 'stylus': {
      stylus.render(txt, async (err, css) => {
        if (err) {
          throw err
        } else {
          createdFile(path, '.wxss', await url2cdn(css))
        }
      })
      break
    }

    case 'sass':
    case 'scss': {
      sass.render({ data: txt, indentedSyntax: options.lang === 'sass' }, async (err, result) => {
        if (err) {
          throw err
        } else {
          createdFile(path, '.wxss', await url2cdn(result.css.toString()))
        }
      })
      break
    }

    default: {
      createdFile(path, '.wxss', await url2cdn(txt))
    }
  }
}

module.exports = compiler
