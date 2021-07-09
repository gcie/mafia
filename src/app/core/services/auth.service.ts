import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { auth, UserInfo } from 'firebase';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

export interface User {
  name: string;
  email?: string;
  uid?: string;
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

  constructor(private router: Router, private ngZone: NgZone, private storage: StorageService) {
    auth().onAuthStateChanged((authState) => {
      if (authState) {
        of(authState)
          .pipe(mapUserToUserInfo())
          .subscribe((user: UserInfo) => {
            this.authState$.next({ resolved: true, online: true, user: { name: user.displayName, email: user.email, uid: user.uid } });
          });
      }
    });
  }

  public nicknameSignIn(nickname: string): Observable<User> {
    const user: User = { name: nickname, email: null };
    this.authState$.next({ resolved: true, user, online: false });
    this.storage.setNickname(nickname);
    this.storage.setLastNickname(nickname);
    return of(user);
  }

  public googleSignIn(): Observable<User> {
    return cfaSignIn('google.com').pipe(
      mapUserToUserInfo(),
      map(({ displayName, email, uid }) => ({ name: displayName, email, uid }))
    );
  }

  public signOut(): void {
    this.storage.deleteNickname();
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
}
