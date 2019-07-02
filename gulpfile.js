const { src, task, watch, dest } = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function serve() {
    browserSync.init({server: './'});
    watch('./sass/*.sass', sassCompiling);
    watch('./*.html').on('change', browserSync.reload);
}

function sassCompiling() {
    return src('./sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());
}

exports.default = serve;