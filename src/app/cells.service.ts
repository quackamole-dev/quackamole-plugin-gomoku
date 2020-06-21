import {Injectable} from '@angular/core';
import {STONE_TYPE} from '../constants';
import {IAction} from '../interfaces/action';

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
  }


  cellEmpty(index: number): boolean {
    return !this.cells[index];
  }

  boardEmpty(): boolean {
    return this.cells.every((stoneType: STONE_TYPE) => stoneType === STONE_TYPE.NONE);
  }

  placeStone(action: IAction): void {
    this.cells[action.cellIndex] = action.player.stoneType;
  }

  checkWinningCondition(action: IAction): boolean {
    return this.checkHorizontal(action) || this.checkVertical(action) || this.checkDiagonal(action);
  }

  private checkHorizontal({player, cellIndex}: IAction) {
    const indicesLeft = [cellIndex, cellIndex - 1, cellIndex - 2, cellIndex - 3, cellIndex - 4];
    const indicesRight = [cellIndex, cellIndex + 1, cellIndex + 2, cellIndex + 3, cellIndex + 4];

    let lengthLeft = this.getSequenceLength(indicesLeft, player.stoneType);
    let lengthRight = this.getSequenceLength(indicesRight, player.stoneType);

    const maxLengthLeft = this.getMaxLength(indicesLeft);
    const maxLengthRight = this.getMaxLength(indicesRight);

    lengthLeft = Math.min(lengthLeft, maxLengthLeft);
    lengthRight = Math.min(lengthRight, maxLengthRight);

    return lengthLeft + lengthRight - 1 >= 5;
  }

  private checkVertical({player, cellIndex}: IAction) {
    const offset = this.sizeX;
    const indicesTop = [cellIndex, cellIndex - offset, cellIndex - (offset * 2), cellIndex - (offset * 3), cellIndex - (offset * 4)];
    const indicesBottom = [cellIndex, cellIndex + offset, cellIndex + (offset * 2), cellIndex + (offset * 3), cellIndex + (offset * 4)];

    const lengthTop = this.getSequenceLength(indicesTop, player.stoneType);
    const lengthBottom = this.getSequenceLength(indicesBottom, player.stoneType);

    return lengthTop + lengthBottom - 1 >= 5;
  }

  private checkDiagonal({player, cellIndex}: IAction) {
    let offset = this.sizeX + 1;
    const indicesTL = [cellIndex, cellIndex - offset, cellIndex - offset * 2, cellIndex - offset * 3, cellIndex - offset * 4];
    const indicesBR = [cellIndex, cellIndex + offset, cellIndex + offset * 2, cellIndex + offset * 3, cellIndex + offset * 4];

    offset = this.sizeX - 1;
    const indicesTR = [cellIndex, cellIndex - offset, cellIndex - offset * 2, cellIndex - offset * 3, cellIndex - offset * 4];
    const indicesBL = [cellIndex, cellIndex + offset, cellIndex + offset * 2, cellIndex + offset * 3, cellIndex + offset * 4];

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
