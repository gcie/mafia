import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss'],
})
export class MasterViewComponent {
  token: Observable<string>;

  constructor(gameSrv: GameService) {
    this.token = gameSrv.game$.pipe(map((game) => game?.token || ''));
  }
}
