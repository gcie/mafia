import { createAction, props } from '@ngrx/store';
import { GameData } from 'src/app/core/models/game-data';
import { PlayerData } from 'src/app/core/models/player-data';

export const createGame = createAction('[Game] create game');

export const createGameSuccess = createAction('[Game] create game success', props<{ createdGameToken: string }>());

export const createGameFailure = createAction('[Game] create game failure');

export const joinGame = createAction('[Game] join a game', props<{ token: string }>());

export const joinGameSuccess = createAction('[Game] join game success');

export const joinGameUpdate = createAction('[Game] join game update data', props<{ gameData: GameData; playerData?: PlayerData }>());

export const joinGameFailure = createAction('[Game] join game failure');
