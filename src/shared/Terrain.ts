import * as pixi from 'pixi';
import ITerrain from './ITerrain';

export default class terrain implements ITerrain {
	type: string;
	display: pixi.DisplayObject;
}