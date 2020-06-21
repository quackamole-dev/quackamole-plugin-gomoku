import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player';
import {STONE_TYPE} from '../constants';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerLight: IPlayer;
  private playerDark: IPlayer;
  private activePlayer: IPlayer;
  localPeerStarted = false;
  winningPlayer: IPlayer;

  constructor() { }

  getActivePlayer(): IPlayer {
    return this.activePlayer;
  }

  getMyPlayer(): IPlayer {
    return this.localPeerStarted ? this.playerLight : this.playerDark;
  }

  toggleActivePlayer(): void {
    this.activePlayer = {...this.activePlayer.peerId === this.playerLight.peerId ? this.playerDark : this.playerLight};
  }

  initPlayers(): void {
    // TODO have some sort of peer service that retrieves the peerIds of players in the room and init once available.
    this.playerLight = {
      stoneType: STONE_TYPE.LIGHT,
      peerId: 'dummy-peer-id1',
      score: 0
    };

    this.playerDark = {
      stoneType: STONE_TYPE.DARK,
      peerId: 'dummy-peer-id2',
      score: 0
    };

    this.activePlayer = {...this.playerLight};
    this.winningPlayer = null;
    this.localPeerStarted = false;
  }
}
