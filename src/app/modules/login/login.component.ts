import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  nickname?: string;
  redirectSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private storage: StorageService) {}

  async ngOnInit() {
    this.redirectSub = this.auth.user$.pipe(first((user) => !!user)).subscribe(() => {
      this.router.navigateByUrl('/home');
    });

    forkJoin([this.storage.getNickname(), this.storage.getLastNickname()]).subscribe(([nickname, lastNickname]) => {
      this.nickname = nickname || lastNickname;
      if (nickname) {
        this.nicknameSignIn();
      }
    });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  nicknameSignIn() {
    if (!this.nickname) throw Error('Nickname cannot be empty');
    this.auth.nicknameSignIn(this.nickname).subscribe(this.successRedirect.bind(this));
  }

  googleSignIn() {
    this.auth.googleSignIn().subscribe(this.successRedirect.bind(this));
  }

  private successRedirect() {
    this.router.navigateByUrl('/home');
  }
}
