import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cellIndex: number;
  @Input() cellState: number;
  @Output() placeStone: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    // console.log('cell index', this.cellIndex, 'cell state', this.cellState);
  }

  handlePlaceStone($event: MouseEvent) {
    // console.log('place stone');
    this.placeStone.emit(this.cellIndex);
  }

  isLightStone() {
    return this.cellState === 1;
  }

  isDarkStone() {
    return this.cellState === 2;
  }
}
