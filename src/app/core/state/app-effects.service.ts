import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AppActions } from '.';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';
import { Logger } from '../services/logger.service';

@Injectable({ providedIn: 'root' })
export class AppEffects {
  constructor(private actions$: Actions, private authService: AuthService, private gameService: GameService, private logger: Logger) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.signIn),
      tap((action) => this.logger.debug('[Effects: signIn] action', action)),
      exhaustMap((action) => this.authService.signIn(action.mode, action.nickname)),
      tap((user) => this.logger.debug('[Effects: signIn] user', user)),
      map((user) => AppActions.signInSuccess({ user }))
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.signOut),
      tap(() => this.logger.debug('[Effects: signOut]')),
      exhaustMap(() => this.authService.signOut()),
      map(() => AppActions.signOutSuccess())
    )
  );
}
