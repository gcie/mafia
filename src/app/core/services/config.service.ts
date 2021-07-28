import { Injectable, InjectionToken } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@capacitor/core';
import { forkJoin, from } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { LogLevel } from './logger.service';

export const PID = new InjectionToken<string>('pid');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  pid: string;
  logging: {
    level: LogLevel;
  };

  constructor(private firestore: AngularFirestore) {}

  public load() {
    return forkJoin({
      logging: this.firestore.collection('config').doc('logging').get(),
      pid: from(Storage.get({ key: 'pid' })).pipe(
        pluck('value'),
        map((pid) => {
          if (!pid) {
            pid = v4();
            Storage.set({ key: 'pid', value: pid });
          }
          return pid;
        })
      ),
    }).pipe(
      tap(({ logging, pid }) => {
        this.logging = logging.data() as any;
        this.pid = pid;
      })
    );
  }
}
