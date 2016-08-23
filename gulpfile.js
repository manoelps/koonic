var bower, coffee, concat, gulp, gutil, handleError, jade, minifyCss, paths, rename, sass, sh, uglify;

gulp = require('gulp');

gutil = require('gulp-util');

bower = require('bower');

concat = require('gulp-concat');

sass = require('gulp-sass');

minifyCss = require('gulp-clean-css');

rename = require('gulp-rename');

sh = require('shelljs');

coffee = require('gulp-coffee');

pug = require('gulp-pug');

uglify = require('gulp-uglify');

paths = {
  sass: ['./src/scss/**/*.scss', './src/sass/**/*.sass'],
  coffee: ['./src/coffee/**/*.coffee'],
  pug: ['./src/pug/**/*.pug']
};

handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('default', ['sass', 'coffee', 'pug', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./src/sass/ionic.app.scss').pipe(sass({
    errLogToConsole: true
  })).pipe(gulp.dest('./www/css/')).pipe(minifyCss({
    keepSpecialComments: 0
  })).pipe(rename({
    extname: '.min.css'
  })).pipe(gulp.dest('./www/css/')).on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee).pipe(coffee({
    bare: true
  }).on('error', handleError)).pipe(concat('application.js')).pipe(gulp.dest('./www/js')).pipe(uglify({
    mangle: false
  })).pipe(rename({
    extname: '.min.js'
  })).pipe(gulp.dest('./www/js')).on('end', done);
});

gulp.task('pug', function(done) {
  gulp.src(paths.pug).pipe(pug().on('error', handleError)).pipe(gulp.dest('./www/')).on('end', done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install().on('log', function(data) {
    gutil.log('bower', gutil.colors.cyan(data.id), data.message);
  });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log('  ' + gutil.colors.red('Git is not installed.'), '\n  Git, the version control system, is required to download Ionic.', '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.', '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.');
    process.exit(1);
  }
  done();
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.pug, ['pug']);
});