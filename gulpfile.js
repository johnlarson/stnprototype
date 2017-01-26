const app = require('../app');
const debug = require('debug')('stn:server');
const http = require('http');
const gulp = require('gulp');

gulp.task('default', ['dev']);

gulp.task('dev', ['build-dev', 'dev-server']);

gulp.task('build-dev', ['copy-dev', 'bundle-dev', 'babel-server-dev']);

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
			publicPath: `http://localhost:${port}/`
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				},
			]
		},
	},
	(err, stats) => {
		gutil.log('[webpack]', stats.toString({}));
		if(err) callback();
	});
});

gulp.task('babel-server-dev', () => {

});

gulp.task('dev-server', () => {

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

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
