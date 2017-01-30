import IGameMap from './IGameMap';
import ITerrain from './ITerrain';
import IEntity from './IEntity';
import * as Map from 'es6-map';
import * as ioClient from 'socket.io-client';

let uid = 0;

class GameMap implements IGameMap {

	private static uid:number;

	terrain: Array<Array<ITerrain>>;
	entities: Map<string, IEntity>;
	
	constructor(json:Object, env:string) {
		this.uid = 0;
		this.load(json, env);
	}

	load(json:Object, env:string) {
		this.loadTerrain(json.terrain);
		this.loadEntities(json.entities, env);
		if(env == 'server') {
			this.receiveAddEntity = () => {};
			this.receiveRemoveEntity = () => {};
		} else if(env = 'client') {
			this.sendAddEntity = () => {};
			this.sendRemoveEntity = () =>{};
			
		}
	}

	private loadTerrain(json:Array) {
		this.terrain = [];
		for(jsonRow of json.terrain) {
			let terrainRow = [];
			this.terrain.push(terrainRow);
			for(jsonTile of jsonRow) {
				terrainRow.push(new Terrain(jsonTile));
			}
		}
	}

	private loadEntities(json:Array, env:string) {
		for(item of json) {
			let id = getNextID();
			if(item.type === 'player') {
				entities[id] = new Player(item, env);
			} else if(item.type === 'zombie') {
				entities[id] = new Zombie(item, env);
			}
		}
	}

	getNextID() {
		uid++;
		return uid;
	}

	sendAddEntity(entity:IEntity) {}

	receiveAddEntity(entity:IEntity) {}

	sendRemoveEntity(entity:IEntity) {}

	receiveRemoveEntity(entity:IEntity) {}

}