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
const glob = require('glob');

require('source-map-support').install();

const DEFAULT_PORT = 3000;

let server;
let port;

gulp.task('default', ['dev']);

gulp.task('dev', ['copy', 'bundle', 'server']);

gulp.task('copy', () => {
	return gulp.src(['src/**/*', 'src/**/.*'])
		.pipe(watch(['src/**/*', 'src/**/.*']))
		.pipe(exclude('**/*.ts'))
		.pipe(gulp.dest('dist'));
});

gulp.task('compile-server', ['compile-shared'], () => {
	return gulp.src('src/server/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript({
			sourceMap: true,
			target: 'es5',
			moduleResolution: 'node'    
		}))
		.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/server'));
});

gulp.task('compile-shared', () => {
	return gulp.src('src/shared/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript({
			sourceMap: true,
			target: 'es5',
			moduleResolution: 'node'    
		}))
		.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/shared'));
});

gulp.task('build', () => {
	return gulp.src('src/client/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript({
			sourceMap: true,
			target: 'es5',
			moduleResolution: 'node'    
		}))
		.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'));
});

gulp.task('bundle', ['build'], callback => {
	let globArray = glob.sync('./build/**/main.js');
	console.log('GLOB');
	console.log(globArray);
	return webpack({
		entry: glob.sync('./build/**/main.js'),
		output: {
			path: path.join(__dirname, 'dist/client'),
			filename: '[name].js',
		}
	},
	(err, stats) => {
		gutil.log('[webpack]', stats.toString({}));
		callback();
	});
});

gulp.task('server', ['start-dev-server'], () => {
    watch('src/**/*.js', () => {
		server.terminate(() => {
			gulp.start('start-dev-server');
		});
	});
});

gulp.task('start-dev-server', ['compile-server'], () => {
	require('./dist/server');
});

