import * as http from 'http';
import * as debug from 'debug';
import app from './app';
import io from './io';

declare const process;

const DEFAULT_PORT = 3000;

let server:http.Server;
let port:number;

export function createServer() {
    let defaultPortString:number = Number(DEFAULT_PORT);
    port = normalizePort(process.env.PORT || defaultPortString);
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    server.on('error', onServerError);
    server.on('listening', onServerListening);
    io(server);
    return server;
}

function normalizePort(val) {
    let port:number = parseInt(val, 10);
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
    let bind:string = typeof port === 'string'
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
    let bind:string = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('stn:server')('Listening on ' + bind);
}