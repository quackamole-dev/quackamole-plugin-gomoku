import {Component, OnDestroy, OnInit} from '@angular/core';
import {CellsService} from '../cells.service';
import {PlayerService} from '../player.service';
import {IPlayer} from '../../interfaces/player';
import {QuackamoleService} from '../quackamole.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IAction} from '../../interfaces/action';
import {SoundService} from '../sound.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();  // https://stackoverflow.com/a/41177163
  sizeX = 15;
  sizeY = 10;

  constructor(public cellsService: CellsService,
              public playerService: PlayerService,
              public quackamoleService: QuackamoleService,
              public soundService: SoundService) { }

  ngOnInit(): void {
    this.initGame();
    this.initSubscriptions();
    this.soundService.init();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  initGame() {
    this.playerService.initPlayers();
    this.cellsService.initBoardSize(this.sizeX, this.sizeY);
    this.quackamoleService.init();
  }

  resetGame() {
    this.quackamoleService.sendResetGame();
  }

  handlePlaceStone(cellIndex: number) {
    if (this.cellsService.cellEmpty(cellIndex)) {
      const player: IPlayer = this.playerService.getActivePlayer();

      // the first player placing a stone on an empty board is automatically the starting player
      if (this.cellsService.boardEmpty()) {
        this.playerService.localPeerStarted = true;
      }

      // place stone only when own turn
      if (player.stoneType === this.playerService.getMyPlayer().stoneType) {
        this.quackamoleService.sendPlaceStone({player, cellIndex});
      }
    }
  }

  getEndGameMessage(): string {
    const activePlayer = this.playerService.getActivePlayer();
    const myPlayer = this.playerService.getMyPlayer();
    const didIWin = activePlayer.stoneType === myPlayer.stoneType;
    return didIWin ? 'Congratulations, you won the game!' : 'Sorry, you lost the game!';
  }

  initSubscriptions() {
    this.quackamoleService.peerAction$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((action: IAction) => {
        this.cellsService.placeStone(action);
        this.soundService.play('place stone'); // TODO use constants to identify sound effects

        if (this.cellsService.checkWinningCondition(action)) {
          this.playerService.winningPlayer = action.player;
        } else {
          this.playerService.toggleActivePlayer();
        }
      });

    this.quackamoleService.resetGame$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.initGame();
      });
  }
}

// TODO make a 3D box out of the board https://3dtransforms.desandro.com/cube that can be moved around by dragging the mouse
