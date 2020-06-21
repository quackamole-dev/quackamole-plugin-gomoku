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
    const indicesLeft = [index, index - 1, index - 2, index - 3, index - 4];
    const indicesRight = [index, index + 1, index + 2, index + 3, index + 4];

    let lengthLeft = this.getSequenceLength(indicesLeft, player.stoneType);
    let lengthRight = this.getSequenceLength(indicesRight, player.stoneType);

    const maxLengthLeft = this.getMaxLength(indicesLeft);
    const maxLengthRight = this.getMaxLength(indicesRight);

    lengthLeft = Math.min(lengthLeft, maxLengthLeft);
    lengthRight = Math.min(lengthRight, maxLengthRight);

    return lengthLeft + lengthRight - 1 >= 5;
  }

  private checkVertical(player: IPlayer, index) {
    const offset = this.sizeX;
    const indicesTop = [index, index - offset, index - (offset * 2), index - (offset * 3), index - (offset * 4)];
    const indicesBottom = [index, index + offset, index + (offset * 2), index + (offset * 3), index + (offset * 4)];

    const lengthTop = this.getSequenceLength(indicesTop, player.stoneType);
    const lengthBottom = this.getSequenceLength(indicesBottom, player.stoneType);

    return lengthTop + lengthBottom - 1 >= 5;
  }

  private checkDiagonal(player: IPlayer, index) {
    let offset = this.sizeX + 1;
    const indicesTL = [index, index - offset, index - offset * 2, index - offset * 3, index - offset * 4];
    const indicesBR = [index, index + offset, index + offset * 2, index + offset * 3, index + offset * 4];

    offset = this.sizeX - 1;
    const indicesTR = [index, index - offset, index - offset * 2, index - offset * 3, index - offset * 4];
    const indicesBL = [index, index + offset, index + offset * 2, index + offset * 3, index + offset * 4];

    let lengthTL = this.getSequenceLength(indicesTL, player.stoneType);
    let lengthBR = this.getSequenceLength(indicesBR, player.stoneType);
    let lengthTR = this.getSequenceLength(indicesTR, player.stoneType);
    let lengthBL = this.getSequenceLength(indicesBL, player.stoneType);

    const maxLengthTL = this.getMaxLength(indicesTL);
    const maxLengthBR = this.getMaxLength(indicesBR);
    const maxLengthTR = this.getMaxLength(indicesTR);
    const maxLengthBL = this.getMaxLength(indicesBL);

    lengthTL = Math.min(lengthTL, maxLengthTL);
    lengthBR = Math.min(lengthBR, maxLengthBR);
    lengthTR = Math.min(lengthTR, maxLengthTR);
    lengthBL = Math.min(lengthBL, maxLengthBL);

    return lengthTL + lengthBR - 1 >= 5 || lengthTR + lengthBL - 1 >= 5;
  }

  /**
   * Compare a sequence of indices to get the number of stoneTypes in a row
   * @param indices The cell indices you want to compare
   * @param stoneType The STONE_TYPE you want to check against
   */
  private getSequenceLength(indices: number[], stoneType: STONE_TYPE): number {
    const cellSequence = indices.map((index: number) => this.cells[index]);
    const firstWrongStoneIndex = cellSequence.findIndex((type: STONE_TYPE) => type !== stoneType);
    return firstWrongStoneIndex === -1 ? 5 : firstWrongStoneIndex;
  }

  /**
   * Returns the max chain length possible without wrapping around the left or right edge
   */
  private getMaxLength(indices: number[]): number {
    const numbers = indices.map((_index: number) => _index % this.sizeX);
    for (let i = 1; i < numbers.length; i++) {
      if (Math.abs(numbers[i] - numbers[i - 1]) !== 1) { return i; }
    }
    return 5;
  }
}
