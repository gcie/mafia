import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Logger, LOGGER_PREFIX } from 'src/app/core/services/logger.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AppActions, State } from 'src/app/core/state';
import { GameActions } from '../game/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: LOGGER_PREFIX, useValue: 'HomeComponent' }, { provide: Logger }],
})
export class HomeComponent {
  gameCode: string;
  username: Observable<string> = this.auth.user$.pipe(map((user) => user?.displayName || ''));
  lastGameToken?: string;

  constructor(
    public auth: AuthService,
    private state: Store<State>,
    private actions$: Actions,
    private router: Router,
    private dialog: DialogService,
    private logger: Logger,
    storage: StorageService
  ) {
    storage.getGameToken().subscribe((token) => (this.lastGameToken = token));
  }

  logout() {
    this.actions$.pipe(ofType(AppActions.signOutSuccess), take(1)).subscribe(() => this.router.navigateByUrl('/login'));
    this.state.dispatch(AppActions.signOut());
  }

  async newGame() {
    this.state.dispatch(GameActions.createGame());
    this.actions$.pipe(ofType(GameActions.createGameSuccess)).subscribe(() => this.logger.debug('SUCCESS'));

    // const loader = this.dialog.loadingDialog('Tworzenie nowej gry...');

    // try {
    //   const token = await this.game.newGame();
    //   await this.router.navigateByUrl(`/game/${token}/master/waiting-room`);
    // } catch (err) {
    //   console.error(err);
    //   this.dialog.notification('Nie udało się utworzyć nowej gry!');
    // } finally {
    //   loader.close();
    // }
  }

  async joinGame(token: string) {
    const loader = this.dialog.loadingDialog('Dołączanie do gry...');
    this.logger.debug(`Dołączanie do gry ${token}`);

    try {
      // await this.game.joinGame(token);
      await this.router.navigateByUrl(`/game/${token}`);
    } catch (err) {
      console.error(err);
      this.dialog.notification('Nie znaleziono gry!');
    } finally {
      loader.close();
    }
  }
}
