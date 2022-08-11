import { createReducer, on } from '@ngrx/store';
import * as GameActions from 'src/app/modules/game/state/game.actions';
import * as AppActions from './app.actions';
import { AppState, initialState } from './app.state';

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppActions.resolveAuthState, (state): AppState => {
    return {
      ...state,
      auth: {
        ...state.auth,
        resolved: true,
      },
    };
  }),
  on(AppActions.setUser, (state, action): AppState => {
    return {
      ...state,
      auth: {
        ...state.auth,
        user: action.user,
      },
    };
  }),
  on(AppActions.signInSuccess, (state, action): AppState => {
    return {
      ...state,
      auth: {
        ...state.auth,
        user: action.user,
      },
    };
  }),
  on(AppActions.signOutSuccess, (state): AppState => {
    return {
      ...state,
      auth: {
        ...state.auth,
        user: null,
      },
    };
  }),
  on(GameActions.createGameSuccess, (state, action): AppState => {
    return {
      ...state,
      createdGameToken: action.createdGameToken,
    };
  })
);
