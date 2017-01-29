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

const DEFAULT_PORT = 3000;

let server;
let port;

gulp.task('default', ['dev']);

gulp.task('dev', ['build-dev', 'dev-server']);

gulp.task('build-dev', ['copy-dev', 'bundle-dev']);

gulp.task('copy-dev', () => {
	return gulp.src(['src/**/*', 'src/**/.*'])
		.pipe(watch(['src/**/*', 'src/**/.*']))
		.pipe(exclude('**/*.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('bundle-dev', callback => {
	let jsPaths = getClientJsPaths();
	let entryPoints = {};
	for(let i = 0; i < jsPaths.length; i++) {
		let src = jsPaths[i];
		let dest = src.replace('src/', '');
		entryPoints[dest] = src;
	}

	let compiler = webpack({
		entry: entryPoints,
		output: {
			path: path.join(__dirname, 'dist'),
			filename: '[name]',
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2016', 'react']
					}
				},
			]
		},
		watch: true,
		devtool: 'inline-source-map'
	},
	(err, stats) => {
		gutil.log('[webpack]', stats.toString({}));
		if(err) callback();
	});
});

gulp.task('babel-server-dev', () => {
	return gulp.src('src/**/*.js')
		.pipe(exclude('public/**/*.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('dev-server', ['start-dev-server'], () => {
    watch('src/**/*.js', () => {
    	gutil.log('WATCH TRIGGERED!');
		server.terminate(() => {
			gutil.log('TERMINATED!');
			gulp.start('start-dev-server');
		});
	});
});

gulp.task('start-dev-server', ['babel-server-dev'], () => {
	let app = require('./dist/app');
    let defaultPortString = Number.parseInt(DEFAULT_PORT);
    port = normalizePort(process.env.PORT || defaultPortString);
    app.set('port', port);
    server = http.createServer(app);
    enableTerminate(server);
    server.listen(port);
    server.on('error', onServerError);
    server.on('listening', onServerListening);
});

function getClientJsPaths() {
	let paths = new Set();
	let allFiles = wrench.readdirSyncRecursive('src');
	let htmlFiles = allFiles.filter((file) => {
		return file.match('\.html$');
	});
	htmlFiles.map((htmlFile) => {
		let currentFilesPaths = getJsPathsFrom(htmlFile);
		currentFilesPaths.map((jsFile) => {
			paths.add(jsFile);
		});
	});
	return Array.from(paths);
}

function getJsPathsFrom(file) {
	let result = [];
	let filePath = path.join('src', file);
	let htmlContents = fs.readFileSync(filePath, 'utf8');
	let $ = cheerio.load(htmlContents);
	let $scripts = $('script');
	for(let i = 0; i < $scripts.length; i++) {
		let scriptTag = $scripts[i];
		let jsFilePath = $(scriptTag).attr('src');
		let joinedPath = resolveScriptPath(filePath, jsFilePath);
		let withForwardSlash = joinedPath.split('\\').join('/');
		let startWithDot = './' + withForwardSlash;
		result.push(startWithDot);
	}
	return result;
}

function resolveScriptPath(htmlPath, jsPath) {
	let dirName = path.dirname(htmlPath);
	return path.join(dirName, jsPath);
}

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