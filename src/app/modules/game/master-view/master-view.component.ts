import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerData } from 'src/app/core/models/player-data';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss'],
})
export class MasterViewComponent {
  token: Observable<string> = this.gameSrv.game$.pipe(map((game) => game?.token || ''));
  players: Observable<PlayerData[]> = this.gameSrv.game$.pipe(map((game) => game?.players || []));

  constructor(private gameSrv: GameService) {}
}
