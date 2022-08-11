import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user';
import { AppActions, AppSelectors, State } from '../state';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Currently logged in user data */
  public user$ = this.state.select(AppSelectors.getUser);

  /** Checks if user is properly authenticated (not by nickname sign-in) */
  public isAuthenticated$ = this.state.select(AppSelectors.isAuthenticated);

  constructor(private state: Store<State>, private storage: StorageService, private auth: AngularFireAuth, private logger: Logger) {
    this.auth.authState.subscribe((authState) => {
      this.logger.debug('AuthService auth state', authState);
      this.state.dispatch(
        AppActions.setUser({
          user: authState
            ? {
                displayName: authState?.displayName || '',
                email: authState?.email,
                uid: authState?.uid,
              }
            : null,
        })
      );
      this.state.dispatch(AppActions.resolveAuthState());
    });
  }

  public signIn(mode: 'google' | 'nickname', nickname?: string) {
    switch (mode) {
      case 'nickname':
        return this.nicknameSignIn(nickname);
      case 'google':
        return this.googleSignIn();
    }
  }

  /** Sign in with nickname only */
  private nicknameSignIn(nickname: string): Observable<User> {
    const user = { displayName: nickname };
    this.storage.setNickname(nickname);
    this.storage.setLastNickname(nickname);
    return of(user);
  }

  /** Sign in with google */
  private googleSignIn(): Observable<User> {
    return cfaSignIn('google.com').pipe(
      mapUserToUserInfo(),
      map((userInfo) => ({ ...userInfo, displayName: userInfo.displayName || '' }))
    );
  }

  /** Sign out and navigate to login page */
  public signOut() {
    this.storage.deleteNickname();

    return this.isAuthenticated$.pipe(
      take(1),
      switchMap((value) => {
        if (value) {
          return cfaSignOut();
        } else return of(null);
      })
    );
  }
}
