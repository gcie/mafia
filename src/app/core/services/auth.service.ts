import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: BehaviorSubject<AuthState> = new BehaviorSubject({ resolved: false, user: null });
  currentUser$: Observable<User> = this.authState$.pipe(map((authState) => authState?.user));

  constructor(private router: Router, private zone: NgZone) {
    auth().onAuthStateChanged((authState) => {
      of(authState)
        .pipe(mapUserToUserInfo())
        .subscribe((user: UserInfo) => {
          this.authState$.next({ resolved: true, user: { name: user.displayName, email: user.email } });
        });
    });
  }

  public nicknameSignIn(nickname: string): Observable<User> {
    const user: User = { name: nickname, email: null };
    this.authState$.next({ resolved: true, user });
    return of(user);
  }

  public googleSignIn(): Observable<User> {
    return cfaSignIn('google.com').pipe(this.mapUser());
  }

  public signOut(): Observable<void> {
    return cfaSignOut().pipe(
      tap(() => {
        this.router.navigateByUrl('/login');
      })
    );
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
