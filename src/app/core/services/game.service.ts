import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import produce from 'immer';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameData } from '../models/game-data';
import { PlayerData } from '../models/player-data';
import { AuthService } from './auth.service';
import { PID } from './config.service';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  /** Currently active game */
  public game$: BehaviorSubject<GameData | null> = new BehaviorSubject(null);
  public get game(): GameData | null {
    return this.game$.value;
  }
  private set game(value: GameData | null) {
    this.logger.debug('GameService set game', value);
    this.game$.next(value);
  }

  /** Player data */
  public player$: BehaviorSubject<PlayerData | null> = new BehaviorSubject(null);
  public get player(): PlayerData | null {
    return this.player$.value;
  }
  private set player(value: PlayerData | null) {
    this.logger.debug('GameService set player', value);
    this.player$.next(value);
  }

  /**  */
  public isMaster$ = this.game$.pipe(map((game) => game.master.pid == this.pid));
  public get isMaster(): boolean {
    return this.game && this.game.master.uid === this.auth.user.uid;
  }

  private activeGamePlayers: BehaviorSubject<PlayerData[]> = new BehaviorSubject([]);

  private activeGameDataSub?: Subscription;
  private activeGamePlayersSub?: Subscription;
  private activePlayerSub?: Subscription;

  // private readonly gamesClc = this.firestore.collection('games');

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private firestore: AngularFirestore,
    private logger: Logger,
    @Inject(PID) private pid: string
  ) {}

  async newGame() {
    const token = await this.genUniqueToken().toPromise();
    const user = this.auth.user;
    if (!user || !user.uid) throw Error('You have to be logged in to create a game');

    const game: GameData = {
      token,
      createdAt: new Date(),
      master: {
        name: user.displayName,
        uid: user.uid,
        pid: this.pid,
      },
      players: [],
    };

    const gameDoc = this.getGameDoc(token);
    const playersClc = gameDoc.collection('players');

    await gameDoc.set(game);

    this.game = game;
    this.storage.setGameToken(token);

    this.activeGameDataSub?.unsubscribe();
    this.activeGameDataSub = gameDoc.valueChanges().subscribe((game: GameData) => {
      this.game = produce(game, (draftGame) => {
        if (draftGame) draftGame.players = this.activeGamePlayers.value;
      });
    });

    this.activeGamePlayersSub?.unsubscribe();
    this.activeGamePlayersSub = playersClc.valueChanges().subscribe((value) => {
      const players = value.map((doc) => doc as PlayerData);
      this.activeGamePlayers.next(players);
      this.game = produce(this.game, (draftGame) => {
        if (draftGame) draftGame.players = players;
      });
    });

    return token;
  }

  async joinGame(token: string) {
    const gameDoc = this.getGameDoc(token);
    const gameData: GameData = (await gameDoc.get().toPromise()).data() as GameData;

    if (!gameData) throw Error('No game with specified code');

    const user = this.auth.user;
    if (!user) throw Error('You have to be logged in to join a game');

    this.game = gameData;
    this.storage.setGameToken(token);

    if (this.isMaster) {
      // We are the game master
      if (!user.uid) throw Error('You have to be logged in to join this game');

      const playersClc = gameDoc.collection('players');

      this.activeGameDataSub?.unsubscribe();
      this.activeGameDataSub = gameDoc.valueChanges().subscribe((game: GameData) => {
        this.game = produce(game, (draftGame) => {
          if (draftGame) draftGame.players = this.activeGamePlayers.value;
        });
      });

      this.activeGamePlayersSub?.unsubscribe();
      this.activeGamePlayersSub = playersClc.valueChanges().subscribe((value) => {
        const players = value.map((doc) => doc as PlayerData);
        this.activeGamePlayers.next(players);
        this.game = produce(this.game, (draftGame) => {
          if (draftGame) draftGame.players = players;
        });
      });
    } else {
      // We are the player

      const player: PlayerData = {
        gameToken: token,
        name: user.displayName,
        pid: this.pid,
        data: {},
      };
      if (user.uid) player.uid = user.uid;

      const doc = this.getGameDoc(token).collection('players').doc(this.pid);
      const data = (await doc.get().toPromise()).data();

      if (data) {
        this.player = data as PlayerData;
      } else {
        await doc.set(player);
        this.player = player;
      }

      this.activePlayerSub?.unsubscribe();
      this.activePlayerSub = doc.valueChanges().subscribe((snapshot: PlayerData) => {
        this.player = snapshot;
      });

      this.activeGameDataSub?.unsubscribe();
      this.activeGameDataSub = gameDoc.valueChanges().subscribe((game: GameData) => {
        this.game = game;
      });
    }
  }

  /** Leave game and delete all your data (if player) or all game data (if game master). */
  async leaveGame() {
    const gameDoc = this.getGameDoc(this.game.token);

    if (this.isMaster) {
      await gameDoc.delete();
    } else {
      await gameDoc.collection('players').doc(this.pid).delete();
    }
    // this.player = null;
    // this.game = null;
    this.activePlayerSub?.unsubscribe();
    this.activeGameDataSub?.unsubscribe();
  }

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
