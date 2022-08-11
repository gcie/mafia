import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import produce from 'immer';
import { Observable, of, Subscription } from 'rxjs';
import { containsFraction, Fraction, FractionConfigurationEnum, getFractionData } from 'src/app/core/models/fractions';
import { GameConfiguration } from 'src/app/core/models/game-configuration';
import { GameService } from 'src/app/core/services/game.service';
import { Logger, LOGGER_PREFIX } from 'src/app/core/services/logger.service';
import { SelectConfigurationDialogComponent } from '../../components/select-configuration-dialog/select-configuration-dialog.component';
import { SelectFractionsDialogComponent } from '../../components/select-fractions-dialog/select-fractions-dialog.component';

@Component({
  selector: 'app-master-waiting-room',
  templateUrl: './master-waiting-room.component.html',
  styleUrls: ['./master-waiting-room.component.scss'],
  providers: [{ provide: LOGGER_PREFIX, useValue: 'MasterWaitingRoomComponent' }, Logger],
})
export class MasterWaitingRoomComponent implements OnInit, OnDestroy {
  get config() {
    return this._config;
  }
  set config(value) {
    this.logger.debug('set config', value);
    this._config = value;
    this.updateFractionDesc();
    this.updateConfigDesc();
    this.updateNumberOfRequiredPlayers();
  }
  private _config: GameConfiguration = {
    fractions: FractionConfigurationEnum.MIASTO_MAFIA,
    auto: false,
    miasto: 10,
    mafia: 6,
    mafia2: 4,
    syndykat: 5,
  };

  token: Observable<string> = of(''); // this.gameSrv.game$.pipe(map((game) => game?.token || ''));
  players: { name: string; pid: string; selected: boolean }[] = [];

  selectedPlayers: { [pid: string]: boolean } = {};
  numberOfSelectedPlayers = 0;
  numberOfRequiredPlayers = 0;

  fractionsDesc: string;
  configDesc: string;

  private playersSub?: Subscription;

  constructor(private gameSrv: GameService, private router: Router, private logger: Logger, private dialog: MatDialog) {
    this.updateConfigDesc();
    this.updateFractionDesc();
    this.updateNumberOfRequiredPlayers();
  }

  ngOnInit() {
    // this.playersSub = this.gameSrv.game$
    //   .pipe(
    //     map((game) => game?.players || []),
    //     map(
    //       (players) => players.map((player) => ({ name: player.name, pid: player.pid, selected: this.selectedPlayers[player.pid] })) || []
    //     ),
    //     distinctUntilChanged(_.isEqual),
    //     tap((players) => this.logger.debug('players', players)),
    //     tap((players) => (this.players = players))
    //   )
    //   .subscribe((_) => this.updateNumberOfSelectedPlayers());
  }

  ngOnDestroy() {
    this.playersSub?.unsubscribe();
  }

  leave() {
    // this.gameSrv.leaveGame();
    this.router.navigateByUrl('/home');
  }

  editFractions() {
    const selectFractionsDialog = this.dialog.open(SelectFractionsDialogComponent, { data: this.config.fractions });

    selectFractionsDialog.afterClosed().subscribe((fractions) => {
      this.logger.debug('fractions', fractions);
      if (fractions !== undefined)
        this.config = produce(this.config, (draftConfig) => {
          draftConfig.fractions = fractions;
        });
    });
  }

  editConfiguration() {
    const selectConfigDialog = this.dialog.open(SelectConfigurationDialogComponent, { data: this._config, hasBackdrop: false });

    selectConfigDialog.afterClosed().subscribe((config) => {
      this.logger.debug('config', config, typeof config);
      if (config !== undefined) this.config = config;
    });
  }

  updateNumberOfSelectedPlayers() {
    this.numberOfSelectedPlayers = this.players.filter((player) => this.selectedPlayers[player.pid]).length;
  }

  updateFractionDesc() {
    this.fractionsDesc = getFractionData(this.config.fractions).display;
  }

  updateConfigDesc() {
    if (this.config.auto) {
      this.configDesc = 'automatyczna';
    } else {
      this.configDesc =
        `<span class="miasto">${this.config.miasto}</span> / <span class="mafia">${this.config.mafia}</span>` +
        (containsFraction(this.config.fractions, Fraction.MAFIA2) ? ` / <span class="mafia-alt">${this.config.mafia2}</span>` : '') +
        (containsFraction(this.config.fractions, Fraction.SYNDYKAT) ? ` / <span class="syndykat">${this.config.syndykat}</span>` : '');
    }
  }

  updateNumberOfRequiredPlayers() {
    this.numberOfRequiredPlayers =
      this.config.miasto +
      this.config.mafia +
      (containsFraction(this.config.fractions, Fraction.MAFIA2) ? this.config.mafia2 : 0) +
      (containsFraction(this.config.fractions, Fraction.SYNDYKAT) ? this.config.syndykat : 0);
  }
}
