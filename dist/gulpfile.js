'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('start', ['build'], function () {
  var tt = require('./dist/index.js');
}).task('build', function () {
  gulp.src('*.js').pipe(babel({
    presets: ['env']
  })).pipe(gulp.dest('dist'));
});