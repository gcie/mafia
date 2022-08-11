import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { State } from 'src/app/modules/game/state';
import { GameData } from '../models/game-data';
import { PlayerData } from '../models/player-data';
import { AppSelectors } from '../state';
import { ConfigService } from './config.service';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  // private readonly gamesClc = this.firestore.collection('games');

  constructor(
    private storage: StorageService,
    private state: Store<State>,
    private firestore: AngularFirestore,
    private logger: Logger,
    private config: ConfigService
  ) {}

  newGame() {
    const pid = this.config.pid;
    console.log('[GameService] pid:', pid);

    return this.genUniqueToken().pipe(
      concatLatestFrom(() => this.state.select(AppSelectors.getUser)),
      take(1),
      tap(([token, user]) => this.logger.debug('[GameService] newGame params:', token, user)),
      mergeMap(([token, user]) => {
        if (!user || !user.uid) throw Error('You have to be logged in to create a game');

        const game: GameData = {
          token,
          createdAt: new Date(),
          master: {
            name: user.displayName,
            uid: user.uid,
            pid,
          },
          players: [],
        };

        const gameDoc = this.getGameDoc(token);

        return from(gameDoc.set(game)).pipe(mapTo(token));
      }),
      tap(() => this.logger.debug('[GameService] newGame success'))
    );
  }

  joinGame(token: string): Observable<[GameData, PlayerData | undefined]> {
    this.logger.debug(`[GameService] join game: ${token}`);
    const gameDoc = this.getGameDoc(token);
    return gameDoc.get().pipe(
      map((doc) => doc.data()),
      concatLatestFrom(() => this.state.select(AppSelectors.getUser)),
      switchMap(([gameData, user]) => {
        if (!gameData) throw Error('No game with specified code');
        if (!user) throw Error('You have to be logged in to join a game');
        this.storage.setGameToken(token);

        if (gameData.master.uid === user.uid) {
          // We are the game master
          const playersClc = gameDoc.collection('players');
          return combineLatest([gameDoc.valueChanges(), playersClc.valueChanges()]).pipe(
            map(([gameData, playersData]) => {
              gameData.players = playersData.map((doc) => doc as PlayerData);
              return [gameData, undefined] as [GameData, undefined];
            })
          );
        } else {
          // We are the player
          const player: PlayerData = {
            gameToken: token,
            name: user.displayName,
            pid: this.config.pid,
            data: {},
          };
          if (user.uid) player.uid = user.uid;
          const doc: AngularFirestoreDocument<PlayerData> = gameDoc.collection('players').doc(this.config.pid);
          return doc.get().pipe(
            switchMap((data) => {
              if (data) return of(data.data());
              else return from(doc.set(player));
            }),
            switchMap(() => combineLatest([gameDoc.valueChanges(), doc.valueChanges()]))
          );
        }
      })
    );
  }

  /** Leave game and delete all your data (if player) or all game data (if game master). */
  // async leaveGame() {
  //   const gameDoc = this.getGameDoc(this.game.token);

  //   if (this.isMaster) {
  //     await gameDoc.delete();
  //   } else {
  //     await gameDoc.collection('players').doc(this.config.pid).delete();
  //   }
  //   // this.player = null;
  //   // this.game = null;
  //   this.activePlayerSub?.unsubscribe();
  //   this.activeGameDataSub?.unsubscribe();
  // }

  private getGameDoc(token: string): AngularFirestoreDocument<GameData> {
    return this.firestore.collection('games').doc(token);
  }

  private genUniqueToken(): Observable<string> {
    const token = this.genToken();
    return this.firestore
      .collection('games')
      .doc(token)
      .get()
      .pipe(switchMap((doc) => (doc.exists ? this.genUniqueToken() : of(token))));
  }

  private genToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return [0, 0, 0].map((_) => chars[Math.floor(Math.random() * 36)]).join('');
  }
}
