import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { GameService } from 'src/app/core/services/game.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  gameCode: string;
  username: Observable<string>;
  lastGameToken?: string;

  constructor(
    private auth: AuthService,
    private game: GameService,
    private router: Router,
    private dialog: DialogService,
    storage: StorageService
  ) {
    this.username = this.auth.currentUser$.pipe(map((user) => user?.name));
    storage.getGameToken().then((token) => (this.lastGameToken = token));
  }

  ngAfterViewInit() {}

  logout() {
    this.auth.signOut();
  }

  async newGame() {
    const loader = this.dialog.loadingDialog('Tworzenie nowej gry...');

    try {
      await this.game.newGame();
      await this.router.navigateByUrl('/game/master');
    } catch (err) {
      console.error(err);
      this.dialog.notification('Nie udało się utworzyć nowej gry!');
    } finally {
      loader.close();
    }
  }

  async joinGame(token: string) {
    const loader = this.dialog.loadingDialog('Dołączanie do gry...');

    try {
      await this.game.joinGame(token);
      await this.router.navigateByUrl('/game/player');
    } catch (err) {
      console.error(err);
      this.dialog.notification('Nie znaleziono gry!');
    } finally {
      loader.close();
    }
  }
}
