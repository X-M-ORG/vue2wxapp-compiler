const gulp = require('gulp')
const watch = require('gulp-watch')

const compiler = require('./build/compiler')

// 任务流
gulp.task('default', () => {
  watch('**/*.vue', (file) => {
    if (file.event === 'change') {
      compiler(file.path, file.contents.toString())
    }
  })
})
