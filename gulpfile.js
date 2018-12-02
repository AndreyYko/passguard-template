const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')

gulp.task('sass', () => (
  gulp.src('app/sass/**/*.sass')
    .pipe(sass.sync({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
))

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    port: 8080
  })
})

gulp.task('watch', ['browser-sync', 'sass'], () => {
  gulp.watch('app/sass/**/*.sass', ['sass'])
  gulp.watch('app/**/*.html', browserSync.reload)
})