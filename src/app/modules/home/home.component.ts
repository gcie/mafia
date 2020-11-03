import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  gameCode: string;
  username: Observable<string>;

  constructor(private auth: AuthService, private game: GameService) {
    this.username = this.auth.currentUser$.pipe(map((user) => user?.name));
  }

  logout() {
    console.log('logout');
    this.auth.signOut();
  }

  newGame() {
    this.game.newGame();
    // TODO
  }

  joinGame() {
    // TODO
  }
}
