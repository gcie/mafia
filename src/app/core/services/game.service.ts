import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { PidProvider } from '../providers/pid.provider';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

export interface PlayerData {
  gameToken: string;
  name: string;
  uid?: string;
  pid: string;
  data?: any;
}

export interface GameData {
  token: string;
  master: GameMaster;
  createdAt: Date;
}

// export interface GamePrivateData

export interface GameMaster {
  name?: string;
  uid: string;
  pid: string;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  activeGame: BehaviorSubject<GameData> = new BehaviorSubject(null);
  activeGamePlayers: BehaviorSubject<PlayerData[]> = new BehaviorSubject([]);
  activePlayer: BehaviorSubject<PlayerData> = new BehaviorSubject(null);

  activeGameUnsubscribe = () => {};
  activeGamePlayersUnsubscribe = () => {};
  activePlayerUnsubscribe = () => {};

  token: BehaviorSubject<string> = new BehaviorSubject(null);
  masterToken: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private auth: AuthService, private pid: PidProvider, private storage: StorageService) {}

  async newGame() {
    const token = await this.genUniqueToken();
    const user = this.auth.authState$.value.user;
    const pid = await this.pid.get();
    const game: GameData = {
      token,
      createdAt: new Date(),
      master: {
        name: user.name,
        uid: user.uid,
        pid,
      },
    };

    const gameDoc = firestore().collection('games').doc(token);
    const playersClc = firestore().collection('games').doc(token).collection('players');

    await gameDoc.set(game);

    this.activeGame.next(game);
    this.storage.setGameToken(token);

    this.activeGamePlayersUnsubscribe();
    this.activeGameUnsubscribe = gameDoc.onSnapshot((snapshot) => {
      this.activeGame.next(snapshot.data() as GameData);
    });

    this.activeGamePlayersUnsubscribe();
    this.activeGamePlayersUnsubscribe = playersClc.onSnapshot((snapshot) => {
      const players = snapshot.docs.map((doc) => doc.data() as PlayerData);
      this.activeGamePlayers.next(players);
    });
  }

  async joinGame(token: string) {
    const gameDoc = firestore().collection('games').doc(token);
    const gameData: GameData = (await gameDoc.get()).data() as GameData;

    if (!gameData) throw 'No game with specified code';

    this.storage.setGameToken(token);
    const user = this.auth.authState$.value.user;
    const pid = await this.pid.get();
    const player: PlayerData = {
      gameToken: token,
      name: user.name,
      pid,
      data: {},
    };
    if (user.uid) player.uid = user.uid;

    const doc = firestore().collection('games').doc(token).collection('players').doc(pid);
    const data = (await doc.get()).data();

    if (data) {
      this.activePlayer.next(data as PlayerData);
    } else {
      await doc.set(player);
      this.activePlayer.next(player);
    }

    this.activePlayerUnsubscribe();
    this.activePlayerUnsubscribe = doc.onSnapshot((snapshot) => {
      this.activePlayer.next(snapshot.data() as PlayerData);
    });
  }

  private async genUniqueToken(): Promise<string> {
    const token = this.genToken();
    const doc = await firestore().collection('games').doc(token).get();
    return doc.data() ? await this.genUniqueToken() : token;
  }

  private async genUniqueMasterToken(): Promise<string> {
    const token = this.genMasterToken();
    const doc = await firestore().collection('games').doc(token).get();
    return doc.data() ? await this.genUniqueMasterToken() : token;
  }

  private genToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return [0, 0, 0].map((_) => chars[Math.floor(Math.random() * 36)]).join('');
  }

  private genMasterToken(): string {
    return this.genToken() + '-' + this.genToken();
  }
}
