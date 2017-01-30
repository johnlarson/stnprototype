import * as pixi from 'pixi.js';
import Agent from './Agent';

declare const setTimeout;

export default class Zombie extends Agent {

	constructor(x, y, game) {
		super(x, y, game);
		window.z = this;
		setTimeout(this.runAI.bind(this), 1000);
	}

	getSprite() {
		return pixi.Sprite.fromImage('img/zombie.png');
	}

	runAI() {
		setTimeout(this.runAI.bind(this), 1000);
		this.ai();
	}

	ai() {
		this.goRight() ||
		this.goUp() ||
		this.goDown() ||
		this.goRight();
	}

}