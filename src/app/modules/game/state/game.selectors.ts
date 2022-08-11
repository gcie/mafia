import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppSelectors } from 'src/app/core/state';
import { GameState } from './game.state';

const getGameFeatureState = createFeatureSelector<GameState>('game');

export const getGame = createSelector(getGameFeatureState, (state) => state.game);

export const getPlayer = createSelector(getGameFeatureState, (state) => state.player);

export const isMaster = createSelector(AppSelectors.getUser, getGame, (user, gameData) => user?.uid && user?.uid === gameData?.master?.uid);
