import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { GameService } from 'src/app/core/services/game.service';
import { Logger, LOGGER_PREFIX } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-master-waiting-room',
  templateUrl: './master-waiting-room.component.html',
  styleUrls: ['./master-waiting-room.component.scss'],
  providers: [{ provide: LOGGER_PREFIX, useValue: 'MasterWaitingRoomComponent' }, Logger],
})
export class MasterWaitingRoomComponent implements OnInit, OnDestroy {
  token: Observable<string> = this.gameSrv.game$.pipe(map((game) => game?.token || ''));
  players: { name: string; pid: string; selected: boolean }[] = [];

  selectedPlayers: { [pid: string]: boolean } = {};
  numberOfSelectedPlayers: number = 0;

  private playersSub?: Subscription;

  constructor(private gameSrv: GameService, private router: Router, private logger: Logger) {}

  ngOnInit() {
    this.playersSub = this.gameSrv.game$
      .pipe(
        map((game) => game?.players || []),
        map(
          (players) => players.map((player) => ({ name: player.name, pid: player.pid, selected: this.selectedPlayers[player.pid] })) || []
        ),
        distinctUntilChanged(_.isEqual),
        tap((players) => this.logger.debug('players', players)),
        tap((players) => (this.players = players))
      )
      .subscribe((_) => this.updateNumberOfSelectedPlayers());
  }

  ngOnDestroy() {
    this.playersSub?.unsubscribe();
  }

  updateNumberOfSelectedPlayers() {
    this.numberOfSelectedPlayers = this.players.filter((player) => this.selectedPlayers[player.pid]).length;
  }

  leave() {
    this.gameSrv.leaveGame();
    this.router.navigateByUrl('/home');
  }
}
