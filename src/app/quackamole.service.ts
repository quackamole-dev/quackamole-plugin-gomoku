import { Injectable } from '@angular/core';
import { Quackamole } from 'quackamole-sdk';
import {Observable, of, Subject} from 'rxjs';
import {IAction} from '../interfaces/action';

@Injectable({
  providedIn: 'root'
})
export class QuackamoleService {
  private quackamole: any;
  peerAction$: Subject<IAction> = new Subject();
  resetGame$: Subject<IAction> = new Subject();

  constructor() { }

  init() {
    if (!this.quackamole) {
      this.quackamole = new Quackamole();

      this.quackamole.eventManager.on('PLACE_STONE', (action) => {
        this.peerAction$.next(action);
      });

      this.quackamole.eventManager.on('RESET_GAME', (action) => {
        this.resetGame$.next();
      });
    }
  }

  sendPlaceStone(action: IAction) {
    this.quackamole.broadcastData('PLACE_STONE', action);
  }

  sendResetGame() {
    this.quackamole.broadcastData('RESET_GAME');
  }
}
