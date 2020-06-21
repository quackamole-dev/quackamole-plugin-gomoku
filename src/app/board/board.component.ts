import { Component, OnInit } from '@angular/core';
import {CellsService} from '../cells.service';
import {PlayerService} from '../player.service';
import {IPlayer} from '../../interfaces/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  sizeX = 12;
  sizeY = 8;
  winningPlayer: IPlayer;

  constructor(public cellsService: CellsService,
              public playerService: PlayerService) { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.playerService.initPlayers();
    this.cellsService.initBoardSize(this.sizeX, this.sizeY);
    this.winningPlayer = null;
  }

  handlePlaceStone(cellIndex: number) {
    if (this.cellsService.cellEmpty(cellIndex)) {
      const player: IPlayer = this.playerService.getActivePlayer();
      this.cellsService.placeStone(player, cellIndex);

      if (this.cellsService.checkWinningCondition(player, cellIndex)) {
        this.winningPlayer = player;
      } else {
        this.playerService.toggleActivePlayer();
      }
    }
  }
}
