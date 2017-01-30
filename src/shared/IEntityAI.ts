import IGameMap from './IGameMap';

interface IEntityAI {
	go: (map:IGameMap) => void;
}

export default IEntityAI;