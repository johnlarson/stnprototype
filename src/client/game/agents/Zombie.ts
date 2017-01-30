import * as pixi from 'pixi.js';
import Agent from './Agent';

export default class Zombie extends Agent {

	getSprite() {
		return pixi.Sprite.fromImage('img/zombie.png');
	}

}