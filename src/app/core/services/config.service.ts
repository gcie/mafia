import { Injectable, InjectionToken } from '@angular/core';
import { Storage } from '@capacitor/core';
import { from } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { v4 } from 'uuid';

export const PID = new InjectionToken<string>('pid');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  pid: string;

  public load() {
    return from(Storage.get({ key: 'pid' })).pipe(
      pluck('value'),
      map((pid) => {
        if (!pid) {
          pid = v4();
          Storage.set({ key: 'pid', value: pid });
        }
        return pid;
      }),
      tap((pid) => (this.pid = pid)),
      tap(console.log)
    );
  }
}
