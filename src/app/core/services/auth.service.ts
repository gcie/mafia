import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/core';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { auth, UserInfo } from 'firebase';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  resolved: boolean;
  online: boolean;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: BehaviorSubject<AuthState> = new BehaviorSubject({ resolved: false, user: null, online: false });
  currentUser$: Observable<User> = this.authState$.pipe(map((authState) => authState?.user));
  isOnline$: Observable<boolean> = this.authState$.pipe(map(({ online }) => online));

  constructor(private router: Router, private ngZone: NgZone) {
    auth().onAuthStateChanged((authState) => {
      if (authState) {
        of(authState)
          .pipe(mapUserToUserInfo())
          .subscribe((user: UserInfo) => {
            console.log('[AuthService] userInfo: ', user);
            this.authState$.next({ resolved: true, online: true, user: { name: user.displayName, email: user.email } });
          });
      }
    });

    this.authState$.pipe(
      tap(({ user }) => {
        console.log('[AuthService] authstate redirect');
        if (user) {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  public nicknameSignIn(nickname: string): Observable<User> {
    const user: User = { name: nickname, email: null };
    this.authState$.next({ resolved: true, user, online: false });
    Storage.set({ key: 'nickname', value: nickname });
    Storage.set({ key: 'last-nickname', value: nickname });
    return of(user);
  }

  public googleSignIn(): Observable<User> {
    return cfaSignIn('google.com').pipe(this.mapUser());
  }

  public signOut(): void {
    Storage.remove({ key: 'nickname' });

    const authState = this.authState$.value;

    console.log(authState);

    if (authState.user) {
      if (authState.online) {
        cfaSignOut().subscribe(() => {
          this.router.navigateByUrl('/login');
        });
      } else {
        this.authState$.next({ resolved: true, user: null, online: false });
        this.router.navigateByUrl('/login');
      }
    }
  }

  private mapUser(): OperatorFunction<firebase.User, User> {
    return mergeMap((user: firebase.User) => {
      return of(user).pipe(
        mapUserToUserInfo(),
        map(({ displayName, email }) => ({ name: displayName, email }))
      );
    });
  }
}
