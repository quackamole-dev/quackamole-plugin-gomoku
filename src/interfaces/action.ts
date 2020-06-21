import {IPlayer} from './player';

export interface IAction {
  player: IPlayer;
  cellIndex: number;
}
