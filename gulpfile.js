const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const path = require('path');
const fs = require('fs-extra');

const distPath = path.join(__dirname, 'lib');
if (fs.existsSync(distPath)) {
  fs.removeSync(distPath);
}

gulp.task('default', () => {
  const tsResult = gulp.src([
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/__tests__/**/*.tsx',
  ]).pipe(ts({
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true,
    outDir: 'lib',
  }));
  const tsd = tsResult.dts.pipe(gulp.dest('lib'));
  return merge2([tsd]);
});
