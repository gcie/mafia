import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  nickname: string;
  redirect$: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    this.redirect$ = this.auth.currentUser$.pipe(first((user) => !!user)).subscribe(() => {
      this.router.navigateByUrl('/home');
    });

    const nickname = await Storage.get({ key: 'nickname' });
    const lastNickname = await Storage.get({ key: 'last-nickname' });
    if (nickname?.value) {
      this.nickname = nickname.value;
      this.nicknameSignIn();
    } else if (lastNickname?.value) {
      this.nickname = lastNickname.value;
    }
  }

  ngOnDestroy() {
    this.redirect$.unsubscribe();
  }

  nicknameSignIn() {
    this.auth.nicknameSignIn(this.nickname).subscribe(this.successRedirect.bind(this));
  }

  googleSignIn() {
    this.auth.googleSignIn().subscribe(this.successRedirect.bind(this));
  }

  private successRedirect() {
    this.router.navigateByUrl('/home');
  }
}
