var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var path = require('path');

var outPath = path.join('wwwroot', 'dist')

gulp.task('pack-js', function () {
    return gulp.src([path.join('wwwroot', 'js', 'lib', 'wNumb.js'), path.join('wwwroot', 'js', 'lib', 'nouislider.js'), path.join('wwwroot', 'js', '*.js')])
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest(outPath));
});

gulp.task('pack-js-dev', function () {
    return gulp.src([path.join('wwwroot', 'js', 'lib', 'wNumb.js'), path.join('wwwroot', 'js', 'lib', 'nouislider.js'), path.join('wwwroot', 'js', '*.js')])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(outPath));
});

gulp.task('pack-css', function () {
    return gulp.src([path.join('wwwroot', 'css', 'lib', '*.css'), path.join('wwwroot', 'css', '*.css')])
        .pipe(concat('styles.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(outPath));
});

gulp.task('pack-css-dev', function () {
    return gulp.src([path.join('wwwroot', 'css', 'lib', '*.css'), path.join('wwwroot', 'css', '*.css')])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(outPath));
});

gulp.task('default', gulp.series(['pack-js', 'pack-css']));
gulp.task('dev', gulp.series(['pack-js-dev', 'pack-css-dev']));