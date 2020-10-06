import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  gameCode: string;

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.signOut().subscribe(console.log);
  }

  newGame() {
    // TODO
  }

  joinGame() {
    // TODO
  }
}
