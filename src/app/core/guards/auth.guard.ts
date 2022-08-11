import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { positive } from '../models/operators';
import { AppSelectors, State } from '../state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private state: Store<State>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.state.select(AppSelectors.isAuthResolved).pipe(
      positive(),
      switchMap(() => this.state.select(AppSelectors.getUser)),
      map((user) => !!user || this.router.parseUrl('/login'))
    );
  }
}
