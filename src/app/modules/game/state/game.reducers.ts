import { createReducer } from '@ngrx/store';
import { GameState, initialState } from './game.state';

export const gameReducer = createReducer<GameState>(initialState);
