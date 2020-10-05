import { Injectable } from '@angular/core';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { auth, User, UserInfo } from 'firebase';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthState {
  resolved: boolean;
  user: UserInfo;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: BehaviorSubject<AuthState> = new BehaviorSubject({ resolved: false, user: null });
  currentUser$: Observable<UserInfo> = this.authState$.pipe(map((authState) => authState?.user));

  constructor() {
    auth().onAuthStateChanged((authState) => {
      of(authState)
        .pipe(mapUserToUserInfo())
        .subscribe((user: UserInfo) => {
          this.authState$.next({ resolved: true, user });
        });
    });
  }

  public googleSignIn(): Observable<User> {
    if (auth().currentUser) {
      this.authState$.next({ resolved: true, user: auth().currentUser });
    }
    return cfaSignIn('google.com');
  }

  public signOut(): Observable<void> {
    return cfaSignOut();
  }
}
