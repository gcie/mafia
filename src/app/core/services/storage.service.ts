import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private NICKNAME = 'nickname';
  private LAST_NICKNAME = 'last-nickname';
  private GAME_TOKEN = 'game-token';

  public deleteNickname() {
    return from(Storage.remove({ key: this.NICKNAME }));
  }

  public setNickname(value: string) {
    return from(Storage.set({ key: this.NICKNAME, value }));
  }

  public getNickname() {
    return from(Storage.get({ key: this.NICKNAME })).pipe(pluck('value'));
  }

  public setLastNickname(value: string) {
    return from(Storage.set({ key: this.LAST_NICKNAME, value }));
  }

  public getLastNickname() {
    return from(Storage.get({ key: this.LAST_NICKNAME })).pipe(pluck('value'));
  }

  public setGameToken(value: string) {
    return from(Storage.set({ key: this.GAME_TOKEN, value }));
  }

  public getGameToken() {
    return from(Storage.get({ key: this.GAME_TOKEN })).pipe(pluck('value'));
  }
}
