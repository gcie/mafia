import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { Logger } from 'src/app/core/services/logger.service';
import { PID } from '../services/config.service';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanActivate {
  constructor(private gameSrv: GameService, private logger: Logger, private router: Router, @Inject(PID) private pid: string) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const token = route.params.token;
    if (!!this.gameSrv.game && this.gameSrv.game.token == token && (this.gameSrv.player || this.gameSrv.isMaster)) return true;
    await this.gameSrv.joinGame(token);
    const path = `/game/${token}/${this.gameSrv.isMaster ? 'master' : 'player'}/waiting-room`;
    this.logger.debug('GameGuard', 'redirecting to', path);
    return this.router.parseUrl(path);
  }
}
