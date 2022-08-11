import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAuthState = createSelector(getAppFeatureState, (state) => state.auth);

export const getUser = createSelector(getAuthState, (authState) => authState.user);

export const getUserUid = createSelector(getAuthState, (authState) => authState.user.uid);

export const isAuthResolved = createSelector(getAuthState, (authState) => authState.resolved);

export const isAuthenticated = createSelector(getAuthState, (authState) => !!authState.user?.uid);
