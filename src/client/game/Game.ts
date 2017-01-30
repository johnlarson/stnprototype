import * as pixi from 'pixi.js';
import Floor from './terrain/Floor';
import Wall from './terrain/Wall';
import Player from './agents/Player';
import Zombie from './agents/Zombie';
import { rend } from '../stage';

export default class Game {

	terrain: Array<Array<Object>>;
	display: pixi.Container;
	player: Player;
	zombies: Array<Zombie>;

	constructor(data, stage) {
		this.display = new pixi.Container();
		stage.addChild(this.display);
		this.initTerrain(data.terrain);
		this.initPlayer(data.player);
		this.initZombies(data.zombies);
	}

	initTerrain(terrain) {
		this.terrain = []
		for(let i = 0; i < terrain.length; i++) {
			let row = terrain[i];
			this.terrain.push([]);
			for(let j = 0; j < row.length; j++) {
				let type = row[j];
				let tile
				if(type === 'floor') {
					tile = new Floor(j, i);
				} else if(type === 'wall') {
					tile = new Wall(j, i);
				}
				this.terrain[i].push(tile);
				this.display.addChild(tile.getDisplay());
			}
		}
	}

	initPlayer(data) {
		this.player = new Player(data.x, data.y, this);
		this.display.addChild(this.player.display);
	}

	initZombies(data) {
		this.zombies = [];
		for(let zombieData of data) {
			let zombie = new Zombie(zombieData.x, zombieData.y, this)
			this.zombies.push(zombie);
			this.display.addChild(zombie.display);
		}
	}

	get displayWidth() {
		return rend.width;
	}

	get displayHeight() {
		return rend.height;
	}

}