import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { GameService } from 'src/app/core/services/game.service';
import { Logger } from 'src/app/core/services/logger.service';
import { GameActions, State } from '.';

@Injectable({
  providedIn: 'root',
})
export class GameEffects {
  constructor(private actions$: Actions, private logger: Logger, private gameService: GameService, private state: Store<State>) {}

  createGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.createGame),
      concatMap(() => this.gameService.newGame()),
      tap((token) => this.logger.debug('[Effects: createGame] token', token)),
      map((token) => GameActions.createGameSuccess({ createdGameToken: token }))
    )
  );

  joinGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.joinGame),
      switchMap((action) => this.gameService.joinGame(action.token)),
      tap((data) => this.logger.debug('[GameEffects] joinGame data:', data)),
      tap(() => this.state.dispatch(GameActions.joinGameSuccess())),
      map(([gameData, playerData]) => GameActions.joinGameUpdate({ gameData, playerData }))
    )
  );
}
