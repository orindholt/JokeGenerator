const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function buildStyles() {
  return src('sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(purgecss({ content: ['*.html'] }))
    .pipe(dest('css'))
}

function buildScript() {
  return src('js/**/*.js')
    /* .pipe(babel({
      presets: ["@babel/preset-env"]
    })) */
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(dest('dist'))
}

function watchTask() {
  watch(['sass/**/*.scss', 'js/**/*.js', '*.html'], series(buildStyles, buildScript));
}

exports.default = series(buildStyles, buildScript, watchTask);