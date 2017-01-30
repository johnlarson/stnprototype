import * as Map from 'es6-map';
import IEntityController from './IEntityController';
import IEntity from './IEntity';

class EntityController implements IEntityController {

	entity: IEntity;
	actions: Map<number, string>;

	constructor(anEntity:IEntity) {
		this.entity = anEntity;
		window.addEventListener('keydown', e => {
			this.handleInput(e.keyCode);
		});
	}

	sendCommand(keyCode:number) {
		this.entity[this.actions[keyCode]];
	}

	receiveCommand(command:string) {
		
	}

}

export default EntityController;