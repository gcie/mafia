import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PID } from '../services/config.service';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root',
})
export class GameMasterGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router, @Inject(PID) private pid: string) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const activeGame = this.gameService.game;
    return (activeGame && activeGame.master.pid === this.pid) || this.router.createUrlTree(['/home']);
  }
}
