import * as pixi from 'pixi.js';

export default class Wall {

	x: number;
	y: number;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getDisplay() {
		let display = pixi.Sprite.fromImage('img/wall.png');
		display.anchor.x = 0.5;
		display.anchor.y = 0.5;
		display.position.x = this.x * 50;
		display.position.y = this.y * 50;
		return display;
	}
	
}