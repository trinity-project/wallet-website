var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('serve', function () {
  var browserSync = require('browser-sync').create();
  browserSync.init({
    // browser: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    server: './',
    port: 4000
  });
  gulp.watch([
    './css/*.css'
  ],
  function(event) {
    console.log(event.path);
    browserSync.reload(event.path);
  });
});

gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['serve', 'sass:watch'])