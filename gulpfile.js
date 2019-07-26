'use strict';

const gulp  = require('gulp');
const mocha = require('gulp-mocha');

// 定数
const SOURCE_DIR = `${__dirname}/sources`;

/**
 * テスト実行
 */
gulp.task('mocha', () => {
    return gulp.src([`${SOURCE_DIR}/spec/**/*.js`], { read: false })
        .pipe(mocha({ reporter: 'list'}));
});

/**
 * テスト実行
 */
gulp.task('test', gulp.series('mocha'));
