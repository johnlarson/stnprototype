import * as socketIO from 'socket.io';

export default (server) => {

	let io = socketIO(server);

	io.on('connection', socket => {
		socket.emit('games', {a: 'hello'});
	});

}