const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const paths = {
  styles: {
    src: './wwwroot/css/styles.scss',
    dest: './wwwroot/css/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Слідкування за змінами у SCSS файлах
function watchFiles() {
  gulp.watch('./wwwroot/css/**/*.scss', styles);
}

exports.styles = styles;
exports.watch = gulp.series(styles, watchFiles);