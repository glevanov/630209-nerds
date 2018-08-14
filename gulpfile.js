const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

gulp.task('images', function(){
  return gulp.src(['app/**/*.+(png|jpg|gif|svg)', '!app/guide/preview/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
});

gulp.task('styles', function() {
  return gulp.src('app/blocks/**/*.+(css)')
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/blocks/**/*.+(css)', ['styles']);
  gulp.watch('*.html', browserSync.reload);
});
