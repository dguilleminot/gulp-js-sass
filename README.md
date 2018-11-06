# Gulp-js-sass

[![npm version](https://badge.fury.io/js/gulp-js-sass.svg)](https://badge.fury.io/js/gulp-js-sass)

Small gulp module used to compile scss without node-sass/python for deployment in a full nodejs docker container.

```
  npm install gulp-js-sass
```

## Getting started

```
const gulpJsSass  = require('gulp-js-sass')

gulp.task('build-scss', () => {
  return gulp.src('test/**/*.scss')
    .pipe(concat('main.css')) // important!
    .pipe(gulpJsSass())
    .pipe(gulp.dest('tmp'));
})
```

## Important
- gulp-js-sass needs all concatenated scss files to work;

## Dependencies
- fs
- lodash
- precss
- read-vinyl-file-stream
- scssfmt
- strip-css-comments

## Tasks to do

- readme.md

- remove warning : Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.

- tests with sinon mocha
