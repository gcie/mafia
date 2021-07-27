import { GameMaster } from './game-master';
import { PlayerData } from './player-data';

export interface GameData {
  token: string;
  master: GameMaster;
  createdAt: Date;
  players: PlayerData[];
}
