import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-player-waiting-room',
  templateUrl: './player-waiting-room.component.html',
  styleUrls: ['./player-waiting-room.component.scss'],
})
export class PlayerWaitingRoomComponent {
  constructor(private gameSrv: GameService, private router: Router) {}

  leave() {
    // this.gameSrv.leaveGame();
    this.router.navigateByUrl('/home');
  }
}
