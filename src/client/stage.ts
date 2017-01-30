import * as pixi from 'pixi.js';
import * as $ from 'jquery';

let stage:pixi.Container = new pixi.Container();
let renderer:pixi.SystemRenderer = pixi.autoDetectRenderer(800, 400);
renderer.backgroundColor = 0xA0A0A0;
$('body').append(renderer.view);
requestAnimationFrame(update);

function update() {
	requestAnimationFrame(update);
	renderer.render(stage);
}

export default stage;

export const rend = renderer;