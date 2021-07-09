import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';
import { v4 } from 'uuid';

@Injectable()
export class PidProvider {
  public async get() {
    var pid = (await Storage.get({ key: 'pid' }))?.value;
    if (!pid) {
      pid = v4();
      Storage.set({ key: 'pid', value: pid });
    }
    return pid;
  }
}
