import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  nickname: string = 'Gucci';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.nicknameSignIn();
  }

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
