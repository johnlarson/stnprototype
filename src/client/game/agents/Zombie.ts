import * as pixi from 'pixi.js';
import Agent from './Agent';
import Game from '../Game';

declare const setTimeout;

export default class Zombie extends Agent {

	constructor(x:number, y:number, game:Game) {
		super(x, y, game);
		setTimeout(this.runAI.bind(this), 1000);
	}

	getSprite() {
		return pixi.Sprite.fromImage('img/zombie.png');
	}

	runAI() {
		setTimeout(this.runAI.bind(this), 500);
		this.ai();
	}

	ai() {
		this.goRight() ||
		this.goUp() ||
		this.goDown() ||
		this.goLeft();
	}

}