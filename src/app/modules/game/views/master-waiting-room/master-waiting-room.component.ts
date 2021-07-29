import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerData } from 'src/app/core/models/player-data';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-master-waiting-room',
  templateUrl: './master-waiting-room.component.html',
  styleUrls: ['./master-waiting-room.component.scss'],
})
export class MasterWaitingRoomComponent {
  token: Observable<string> = this.gameSrv.game$.pipe(map((game) => game?.token || ''));
  players: Observable<PlayerData[]> = this.gameSrv.game$.pipe(map((game) => game?.players || []));

  constructor(private gameSrv: GameService, private router: Router) {}

  leave() {
    this.gameSrv.leaveGame();
    this.router.navigateByUrl('/home');
  }
}
