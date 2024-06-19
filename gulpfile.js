const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imageMin = require('gulp-imagemin');

function compImg(){
    return gulp.src('./src/images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./build/images'));
}

function compJs(){
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compSass(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.watch = function(){
    gulp.watch('./src/styles/*.scss', {ignoreInitial:false}, gulp.series(compSass));
    gulp.watch('./src/images/*', {ignoreInitial:false}, gulp.series(compImg));
    gulp.watch('./src/scripts/*.js', {ignoreInitial:false}, gulp.series(compJs));
}