import IEntityInfo from './IEntityInfo';
import Change from './Change';

export default class EntityInfo implements IEntityInfo {

	data: Object;

	constructor(data:Object, env) {
		this.data = data;
	}

	sendChange(change:Change) {}

	receiveChange(change:Change) {}

}