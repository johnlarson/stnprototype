import * as pixi from 'pixi.js';

interface Terrain {
	getDisplay: () => pixi.DisplayObject;
}

export default Terrain;