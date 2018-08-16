const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./getTSCommonConfig')();
const babelConfig = require('./getBabelCommonConfig')();
delete babelConfig.cacheDirectory;
const babel = require('gulp-babel');
const transformLess = require('atool-build/lib/transformLess');
const through2 = require('through2');
const merge2 = require('merge2');

function babelify(js) {
  return js.pipe(babel(babelConfig))
    .pipe(gulp.dest('lib'));
}

gulp.task('default', () => {
  const less = gulp.src(['src/' + '**/' + '*.less'])
    .pipe(through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index\.less$/)) {
        transformLess(file.path).then((css) => {
          file.contents = new Buffer(css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        }).catch((e) => {
          console.error(e);
        });
      } else {
        next();
      }
    }))
    .pipe(gulp.dest('lib'));
  const img = gulp.src(['src/' + '**/' + '*.png']).pipe(gulp.dest('lib'));
  const fonts = gulp.src(['src/**/*.eot', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff']).pipe(gulp.dest('lib'));  
  const tsResult = gulp.src([
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/__tests__/**/*.tsx',
  ]).pipe(ts(tsConfig));
  const tsFiles = babelify(tsResult.js);
  const tsd = tsResult.dts.pipe(gulp.dest('lib'));  
  return merge2([tsFiles, tsd]);
});