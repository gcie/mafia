import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PidProvider } from '../providers/pid.provider';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root',
})
export class GameMasterGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router, private pid: PidProvider) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const activeGame = this.gameService.activeGame.getValue();
    return this.pid.get().then((pid) => {
      if (activeGame && activeGame.master.pid === pid) {
        return true;
      } else {
        return this.router.createUrlTree(['/home']);
      }
    });
  }
}
