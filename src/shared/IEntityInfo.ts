interface IEntityInfo {
	data: Object;
	sendChange: (change:Object) => void;
	receiveChange: (change:Object) => void;
}

export default IEntityInfo;