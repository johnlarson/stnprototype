import IEntity from './IEntity';
import * as pixi from 'pixi';
import IEntityAI from './IEntityAI';
import IEntityController from './IEntityController';
import IEntityInfo from './IEntityInfo';

class Entity implements IEntity {

	info: IEntityInfo;
	ai: IEntityAI;
	keys: IEntityController;
	display: pixi.DisplayObject;

	constructor(json) {

	}

}

export default Entity;