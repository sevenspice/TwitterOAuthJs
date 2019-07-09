'use strict';

var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

// 定数
var SOURCE_DIR = `${__dirname}/sources`;

/**
 * テスト実行
 */
gulp.task('mocha', function(){
    return gulp.src([`${SOURCE_DIR}/spec/**/*.js`], { read: false })
        .pipe(mocha({ reporter: 'list'}));
});

/**
 * テスト実行
 */
gulp.task('test', function(callback){
    runSequence('mocha', callback);
});
