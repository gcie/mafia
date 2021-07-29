import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Logger } from '../services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private logger: Logger) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.resolved$.pipe(
      filter((x) => x),
      map(() => !!this.auth.user || this.router.parseUrl('/login'))
    );
  }
}
