
import stage from './stage';
import Game from './game/Game';
import * as io from 'socket.io-client';

let socket = io('http://localhost:3000');

socket.on('game', game => {
	new Game(game, stage);
});