const { src, task, watch, dest } = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function serve() {
    browserSync.init({server: './', browser: 'chrome', notify: false});
    watch('./sass/*.sass', sassCompiling);
    watch('./js/*.js', jsCompiling);
    watch('./*.html').on('change', browserSync.reload);
}

function sassCompiling() {
    return src('./sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream());
}

function jsCompiling() {
    return src('./js/*.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());
}

exports.default = serve;
