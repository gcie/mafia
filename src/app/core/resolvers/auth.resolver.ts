import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { State } from '../state';
import { isAuthResolved } from '../state/app.selectors';

@Injectable({ providedIn: 'root' })
export class AuthResolver implements Resolve<void> {
  constructor(private state: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.state.select(isAuthResolved).pipe(first());
  }
}
