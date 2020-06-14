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

  constructor(public cellsService: CellsService,
              public playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.initPlayers();
  }


  handlePlaceStone(cellIndex: number) {
    if (this.cellsService.cellEmpty(cellIndex)) {
      const player: IPlayer = this.playerService.getActivePlayer();
      this.cellsService.placeStone(player, cellIndex);
      this.playerService.toggleActivePlayer();
    }
  }
}
