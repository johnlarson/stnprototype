import * as pixi from 'pixi.js';
import Agent from './Agent';
import Game from '../Game';

export default class Player extends Agent {

	static keyBindings:Object = {
		'37': 'goLeft',
		'38': 'goUp',
		'39': 'goRight',
		'40': 'goDown'
	}

	constructor(x:number, y:number, game:Game) {
		super(x, y, game);
		window.addEventListener('keydown', e => {
			if(e.keyCode in Player.keyBindings) {
				this[Player.keyBindings[e.keyCode]]();
			}
		});
	}

	getSprite() {
		return pixi.Sprite.fromImage('img/player.png');
	}

	updateDisplay() {
		super.updateDisplay();
		this.game.display.x = -this.display.x + this.game.displayWidth / 2;
		this.game.display.y = -this.display.y + this.game.displayHeight / 2;
	}

}