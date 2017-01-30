import * as pixi from 'pixi.js';
import Game from '../Game';
import Floor from '../terrain/Floor';

export default class Agent {

	x: number;
	y: number;
	display: pixi.Sprite;
	game: Game;
	
	constructor(x, y, game) {
		console.log('constructing');
		this.x = x;
		this.y = y;
		this.display = this.getSprite();
		this.display.anchor.x = 0.5;
		this.display.anchor.y = 0.5;
		this.game = game;
		this.updateDisplay();
	}

	updateDisplay() {
		this.display.position.x = this.x * 50;
		this.display.position.y = this.y * 50;
	}

	goLeft() {
		return this.tryMove(this.x - 1, this.y);
	}

	goUp() {
		return this.tryMove(this.x, this.y - 1);
	}

	goRight() {
		return this.tryMove(this.x + 1, this.y);
	}

	goDown() {
		return this.tryMove(this.x, this.y + 1);
	}


	tryMove(x, y) {
		if(this.game.terrain[y][x] instanceof Floor) {
			this.x = x;
			this.y = y;
			this.updateDisplay();
			return true;
		}
		return false;
	}

	getSprite() {}

}