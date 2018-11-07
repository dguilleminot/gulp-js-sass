const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp
  .task('build', () => {
    return gulp.src('app/*.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest('./'));
  })

  .task('test', ['build'], () => {
    // make sure it built before imorting
    const scssJs = require('./index.js');

    return gulp.src('test/**/*.scss')
      .pipe(concat('main.css'))
      .pipe(scssJs())
      .pipe(gulp.dest('tmp'));
  })
;
