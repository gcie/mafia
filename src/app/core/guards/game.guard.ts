import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { GameActions, GameSelectors, State } from 'src/app/modules/game/state';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanActivate {
  constructor(private actions$: Actions, private router: Router, private state: Store<State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    console.log('[GameGuard] can activate');
    const token = route.params.token;
    return this.state.select(GameSelectors.getGame).pipe(
      map((game) => !!game && game.token == token),
      take(1),
      switchMap((joined) => {
        console.log('[GameGuard] joined:', joined);
        if (joined) return of(true);
        else {
          this.state.dispatch(GameActions.joinGame({ token }));
          return this.actions$.pipe(
            ofType(GameActions.joinGameUpdate),
            take(1),
            switchMap(() => this.state.select(GameSelectors.isMaster)),
            take(1),
            tap((isMaster) => console.log('[GameGuard] isMaster:', isMaster)),
            map((isMaster) => this.router.parseUrl(`/game/${token}/${isMaster ? 'master' : 'player'}/waiting-room`))
          );
        }
      })
    );
  }
}
