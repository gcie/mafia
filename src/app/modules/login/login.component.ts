import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, Subscription } from 'rxjs';
import { positive } from 'src/app/core/models/operators';
import { StorageService } from 'src/app/core/services/storage.service';
import { AppActions, AppSelectors, State } from 'src/app/core/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  nickname?: string;
  redirectSub: Subscription;

  constructor(private state: Store<State>, private actions$: Actions, private router: Router, private storage: StorageService) {}

  async ngOnInit() {
    // this.redirectSub = this.state
    //   .select(AppSelectors.getUser)
    //   .pipe(
    //     bufferCount(2, 1),
    //     filter(([u1, u2]) => !u1 && !!u2) // first there was no user, but later it appeared
    //   )
    //   .subscribe(() => {
    //     this.router.navigateByUrl('/home');
    //   });

    // this.actions$.pipe(ofType(AppActions.signInSuccess))
    this.state
      .select(AppSelectors.getUser)
      .pipe(positive())
      .subscribe(() => {
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
    this.state.dispatch(AppActions.signIn({ mode: 'nickname', nickname: this.nickname }));
  }

  googleSignIn() {
    this.state.dispatch(AppActions.signIn({ mode: 'google' }));
  }
}
