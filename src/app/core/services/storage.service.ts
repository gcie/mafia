import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private NICKNAME = 'nickname';
  private LAST_NICKNAME = 'last-nickname';
  private GAME_TOKEN = 'game-token';

  private mapToValue = (o?: { value: string }) => o?.value;

  public deleteNickname() {
    return Storage.remove({ key: this.NICKNAME });
  }

  public setNickname(value: string) {
    return Storage.set({ key: this.NICKNAME, value });
  }

  public getNickname() {
    return Storage.get({ key: this.NICKNAME }).then(this.mapToValue);
  }

  public setLastNickname(value: string) {
    return Storage.set({ key: this.LAST_NICKNAME, value });
  }

  public getLastNickname() {
    return Storage.get({ key: this.LAST_NICKNAME }).then(this.mapToValue);
  }

  public setGameToken(value: string) {
    return Storage.set({ key: this.GAME_TOKEN, value });
  }

  public getGameToken() {
    return Storage.get({ key: this.GAME_TOKEN }).then(this.mapToValue);
  }
}
