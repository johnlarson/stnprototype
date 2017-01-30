"use strict";

const gulp = require('gulp');
const http = require('http');
const watch = require('gulp-watch');
const exclude = require('gulp-ignore').exclude;
const wrench = require('wrench');
const webpack = require('webpack');
const path = require('path');
const gutil = require('gulp-util');
const fs = require('fs');
const cheerio = require('cheerio');
const babel = require('gulp-babel');
const enableTerminate = require('server-terminate');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

require('source-map-support').install();

const DEFAULT_PORT = 3000;

let server;
let port;

gulp.task('default', ['dev']);

gulp.task('dev', ['copy', 'server']);

gulp.task('copy', () => {
	return gulp.src(['src/**/*', 'src/**/.*'])
		.pipe(watch(['src/**/*', 'src/**/.*']))
		.pipe(exclude('**/*.ts'))
		.pipe(gulp.dest('dist'));
});

gulp.task('bundle', callback => {
	return gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript({
			sourceMap: true,
			target: 'es5',
			moduleResolution: 'node'    
		}))
		.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});

gulp.task('server', ['start-dev-server'], () => {
    watch('src/**/*.js', () => {
		server.terminate(() => {
			gulp.start('start-dev-server');
		});
	});
});

gulp.task('start-dev-server', ['bundle'], () => {
	require('./dist/server');
});

