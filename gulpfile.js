const gulp = require('gulp');
const babel = require('gulp-babel');

gulp
  .task('start', ['build'], () => {
    const tt = require('./dist/index.js');
  })

  .task('build', () => {
    gulp.src('app/*.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest('dist'));
  })
;
