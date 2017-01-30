import * as pixi from 'pixi.js';

export default class Floor {

	x: number;
	y: number;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getDisplay() {
		let display = pixi.Sprite.fromImage('img/floor.png');
		display.anchor.x = 0.5;
		display.anchor.y = 0.5;
		display.position.x = this.x * 50;
		display.position.y = this.y * 50;
		return display;
	}

}