import { GameData } from 'src/app/core/models/game-data';
import { PlayerData } from 'src/app/core/models/player-data';
import * as AppState from 'src/app/core/state/app.state';

export interface State extends AppState.State {
  game: GameState;
}

export interface GameState {
  game?: GameData;
  player?: PlayerData;
}

export const initialState: GameState = {};
