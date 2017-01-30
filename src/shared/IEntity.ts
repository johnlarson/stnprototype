import * as pixi from 'pixi';
import IEntityAI from './IEntityAI';
import IEntityController from './IEntityController';
import IEntityInfo from './IEntityInfo';

interface IEntity {
	info: IEntityInfo;
	ai: IEntityAI;
	keys: IEntityController;
	display: pixi.DisplayObject;
}

export default IEntity;