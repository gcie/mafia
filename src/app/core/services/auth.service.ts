import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Info whether the auth state is ready */
  public resolved$ = new BehaviorSubject(false);
  public get resolved() {
    return this.resolved$.value;
  }
  private set resolved(value) {
    this.resolved$.next(value);
  }

  /** Currently logged in user data */
  public user$: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public get user() {
    return this.user$.value;
  }
  private set user(value) {
    this.logger.debug('user', value);
    this.user$.next(value);
  }

  /** Checks if user is properly authenticated (not by nickname sign-in) */
  public isAuthenticated() {
    return !!this.user?.uid;
  }
  public isAuthenticated$ = this.user$.pipe(map((user) => !!user?.uid));

  constructor(private router: Router, private storage: StorageService, private auth: AngularFireAuth, private logger: Logger) {
    this.auth.authState.subscribe((authState) => {
      this.logger.debug('AuthService auth state', authState);
      this.user = authState
        ? {
            displayName: authState?.displayName || '',
            email: authState?.email,
            uid: authState?.uid,
          }
        : null;
      this.resolved = true;
    });
  }

  /** Sign in with nickname only */
  public nicknameSignIn(nickname: string): Observable<User> {
    this.resolved = true;
    this.user = { displayName: nickname };
    this.storage.setNickname(nickname);
    this.storage.setLastNickname(nickname);
    return of(this.user);
  }

  /** Sign in with google */
  public googleSignIn(): Observable<User> {
    return cfaSignIn('google.com').pipe(
      mapUserToUserInfo(),
      map((userInfo) => ({ ...userInfo, displayName: userInfo.displayName || '' }))
    );
  }

  /** Sign out and navigate to login page */
  public signOut() {
    this.storage.deleteNickname();

    if (this.isAuthenticated()) {
      cfaSignOut().subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    } else {
      this.user = null;
      this.router.navigateByUrl('/login');
    }
  }
}
