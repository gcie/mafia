import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  nickname: string;

  constructor(private auth: AuthService, private router: Router) {}

  nicknameSignIn() {
    this.auth.nicknameSignIn(this.nickname).subscribe(this.successRedirect.bind(this));
  }

  googleSignIn() {
    this.auth.googleSignIn().subscribe(this.successRedirect.bind(this));
  }

  private successRedirect() {
    this.router.navigateByUrl('/');
  }
}
