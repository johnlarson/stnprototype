import socketIO from 'socket.io-client';

let io = socketIO('http://localhost:3000');

io.on('connect', () => {
	console.log('connected');
});

console.log('hello.');

function hello(compiler:string) {
	console.log(`hello from ${compiler}`);
}

hello('TypeScript');

