const gulp = require('gulp');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const { exec } = require('child_process');

gulp.task('watch', async (done) => {
  watch([`./src/**/*.ts`], (cb) => {
    compile();
  });

  let stream = nodemon({
    script: 'dist/main.js',
    args: ['0x733eF82604da06A31e9d0d8e4b44253b61aA212b'],
    ext: 'js',
    watch: 'dist',
    done: done,
  });

  stream.on('crash', function () {
    console.error('Application has crashed!\n');
  });
});

const compile = () => {
  console.log(`Compiling TS files`);
  exec('tsc', (error, stdout, stderr) => {
    if (error) {
      console.trace(error);
    }

    if (stdout) console.log(`${stdout}`);
    if (stderr) console.log(`${stderr}`);
  });
};
