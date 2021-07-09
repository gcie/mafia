import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  nickname: string;
  redirect$: Subscription;

  constructor(private auth: AuthService, private router: Router, private storage: StorageService) {}

  async ngOnInit() {
    this.redirect$ = this.auth.currentUser$.pipe(first((user) => !!user)).subscribe(() => {
      this.router.navigateByUrl('/home');
    });

    const nickname = await this.storage.getNickname();
    const lastNickname = await this.storage.getLastNickname();
    this.nickname = nickname || lastNickname;
    if (nickname) {
      this.nicknameSignIn();
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
