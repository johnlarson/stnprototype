import * as io from 'socket.io-client';

let socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log('connected');
});

socket.on('msg', msg => {
	console.log('hello:', msg);
});

console.log('hello.');

function hello(compiler:string) {
	console.log(`hello from ${compiler}`);
}

hello('TypeScript');

