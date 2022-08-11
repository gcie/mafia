import { Injectable, InjectionToken } from '@angular/core';
import { Storage } from '@capacitor/core';
import { from } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { LogLevel } from './logger.service';

export const PID = new InjectionToken<string>('pid');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  pid: string;
  logging: { level: LogLevel } = environment.logging;

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
      tap((pid) => console.log('Config load pid: ', pid)),
      tap((pid) => (this.pid = pid))
    );
  }
}
