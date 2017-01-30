import * as Map from 'es6-map';
import ITerrain from './ITerrain';
import IEntity from './IEntity';

export interface IGameMap {
	terrain: Array<Array<ITerrain>>;
	entities: Map<string, IEntity>;
	load: (json) => void;
	sendAddEntity: (entity:IEntity) => void;
	receiveAddEntity: (entity:IEntity) => void;
	sendRemoveEntity: (entity:IEntity) => void;
	receiveRemoveEntity: (entity:IEntity) => void;
}

export default IGameMap;