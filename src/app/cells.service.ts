import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player';
import {STONE_TYPE} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CellsService {
  // 0 = no stone, 1 = light, 2 = dark
  cells: STONE_TYPE[] = [
    1, 2, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  constructor() { }

  initBoardSize(x: number, y: number): void {
    // TODO css grid styling should adjust dynamically according to board size. Now it is hardcoded to 10x10
    this.cells = [];
    this.cells.length = x * y;
    this.cells.fill(STONE_TYPE.NONE);
    console.log('cells', this.cells);
  }


  cellEmpty(cellIndex: number): boolean {
    return !this.cells[cellIndex];
  }

  placeStone(player: IPlayer, cellIndex: number): void {
    this.cells[cellIndex] = player.stoneType;
  }
}
