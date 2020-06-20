import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player';
import {STONE_TYPE} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CellsService {
  sizeX = 10;
  sizeY = 10;
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
    this.sizeX = x;
    this.sizeY = y;
    this.cells = [];
    this.cells.length = x * y;
    this.cells.fill(STONE_TYPE.NONE);
    console.log('cells', this.cells);
  }


  cellEmpty(index: number): boolean {
    return !this.cells[index];
  }

  placeStone(player: IPlayer, index: number): void {
    this.cells[index] = player.stoneType;
  }

  checkWinningCondition(player: IPlayer, index: number): boolean {
    return this.checkHorizontal(player, index) || this.checkVertical(player, index) || this.checkDiagonal(player, index);
  }

  private checkHorizontal(player: IPlayer, index) {
    const indicesLeft = [index - 4, index - 3, index - 2, index - 1, index];
    const indicesRight = [index, index + 1, index + 2, index + 3, index + 4];
    return this.checkSequence(indicesLeft, player.stoneType) || this.checkSequence(indicesRight, player.stoneType);
  }

  private checkVertical(player: IPlayer, index) {
    const offset = this.sizeX;
    const indicesTop = [index - (offset * 4), index - (offset * 3), index - (offset * 2), index - offset, index];
    const indicesBottom = [index, index + offset, index + (offset * 2), index + (offset * 3), index + (offset * 4)];
    return this.checkSequence(indicesTop, player.stoneType) || this.checkSequence(indicesBottom, player.stoneType);
  }

  private checkDiagonal(player: IPlayer, index) {
    let offset = this.sizeX + 1;
    const indicesTopLeft = [index - (offset * 4), index - (offset * 3), index - (offset * 2), index - offset, index];
    const indicesBottomRight = [index + (offset * 4), index + (offset * 3), index + (offset * 2), index + offset, index];
    const isWonTopLeftToBottomRight: boolean = this.checkSequence(indicesTopLeft, player.stoneType) || this.checkSequence(indicesBottomRight, player.stoneType);

    offset = this.sizeX - 1;
    const indicesTopRight = [index - (offset * 4), index - (offset * 3), index - (offset * 2), index - offset, index];
    const indicesBottomLeft = [index + (offset * 4), index + (offset * 3), index + (offset * 2), index + offset, index];
    const isWonTopRightToBottomLeft: boolean = this.checkSequence(indicesTopRight, player.stoneType) || this.checkSequence(indicesBottomLeft, player.stoneType);

    return isWonTopLeftToBottomRight || isWonTopRightToBottomLeft;
  }

  private checkSequence(indices: Array<number>, stoneType: STONE_TYPE): boolean {
    const cellSequence = indices.map((index: number) => this.cells[index]);
    return cellSequence.every((_stoneType: STONE_TYPE) => _stoneType === stoneType);
  }
}
