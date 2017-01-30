"use strict";

const gulp = require('gulp');
const debug = require('debug')('stn:server');
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
	let app = require('./dist/server/app').default;
    let defaultPortString = Number.parseInt(DEFAULT_PORT);
    port = normalizePort(process.env.PORT || defaultPortString);
    app.set('port', port);
    server = http.createServer(app);
    enableTerminate(server);
    server.listen(port);
    server.on('error', onServerError);
    server.on('listening', onServerListening);
});

function normalizePort(val) {
	let port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

function onServerError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	let bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onServerListening() {
	let addr = server.address();
	let bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}