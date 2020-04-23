import gulp from 'gulp';
import babel from 'gulp-babel';
// import exec from 'gulp-exec';

// function runTests() {
//     return gulp.src('')
// }

gulp.task('test', () => {
    return gulp.src(['test/test-helpers.js', 'test/tests/*.js', 'app/components/utilities/'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/'))
});
