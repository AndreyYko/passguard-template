const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', () => (
  gulp.src('app/sass/**/*.sass')
    .pipe(sass.sync({ outputStyle: 'expanded' }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
))

gulp.task('img', () => (
  gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'))
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

gulp.task('clean', () => del.sync('dist'))

gulp.task('build', ['clean', 'img', 'sass'], () => {
  gulp.src('app/css/main.css')
    .pipe(gulp.dest('dist/css'))

  gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['watch'])