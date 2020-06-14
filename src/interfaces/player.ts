import {STONE_TYPE} from '../constants';

export interface IPlayer {
  stoneType: STONE_TYPE;
  peerId?: string;
  score: number;
}
