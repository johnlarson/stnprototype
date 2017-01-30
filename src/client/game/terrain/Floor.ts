import * as pixi from 'pixi.js';
import Terrain from './Terrain';

export default class Floor implements Terrain {

	x: number;
	y: number;

	constructor(x:number, y:number) {
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