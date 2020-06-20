import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player';
import {STONE_TYPE} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CellsService {
  sizeX = 10;
  sizeY = 10;
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

    const isWonLeft = this.checkSequence(indicesLeft, player.stoneType) && this.noOverflow(indicesLeft);
    const isWonRight = this.checkSequence(indicesRight, player.stoneType) && this.noOverflow(indicesRight);

    return isWonLeft || isWonRight;
  }

  private checkVertical(player: IPlayer, index) {
    const offset = this.sizeX;
    const indicesTop = [index - (offset * 4), index - (offset * 3), index - (offset * 2), index - offset, index];
    const indicesBottom = [index, index + offset, index + (offset * 2), index + (offset * 3), index + (offset * 4)];
    return this.checkSequence(indicesTop, player.stoneType) || this.checkSequence(indicesBottom, player.stoneType);
  }

  private checkDiagonal(player: IPlayer, index) {
    let offset = this.sizeX + 1;
    const indicesTL = [index - (offset * 4), index - (offset * 3), index - (offset * 2), index - offset, index];
    const indicesBR = [index, index + offset, index + offset * 2, index + offset * 3, index + offset * 4];

    offset = this.sizeX - 1;
    const indicesTR = [index, index - offset, index - offset * 2, index - offset * 3, index - offset * 4];
    const indicesBL = [index + (offset * 4), index + (offset * 3), index + (offset * 2), index + offset, index];

    const isWonTL = this.checkSequence(indicesTL, player.stoneType) && this.noOverflow(indicesTL);
    const isWonBR = this.checkSequence(indicesBR, player.stoneType) && this.noOverflow(indicesBR);
    const isWonTR = this.checkSequence(indicesTR, player.stoneType) && this.noOverflow(indicesTR);
    const isWonBL = this.checkSequence(indicesBL, player.stoneType) && this.noOverflow(indicesBL);

    return isWonTL || isWonBR || isWonTR || isWonBL;
  }

  private checkSequence(indices: Array<number>, stoneType: STONE_TYPE): boolean {
    const cellSequence = indices.map((index: number) => this.cells[index]);
    return cellSequence.every((_stoneType: STONE_TYPE) => _stoneType === stoneType);
  }

  /**
   * verify that the sequence is not wrapping around the horizontal border
   */
  private noOverflow(indices: number[]): boolean {
    const numbers = indices.map((_index: number) => _index % this.sizeX);
    return numbers.every((num: number, i: number, arr: number[]) => {
      return i === 0 || num > arr[i - 1];
    });
  }
}
