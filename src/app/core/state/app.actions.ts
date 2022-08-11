import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const resolveAuthState = createAction('[Auth] resolve auth state');

export const setUser = createAction('[Auth] set user', props<{ user: User }>());

export const signIn = createAction('[Auth] sign in', props<{ mode: 'nickname' | 'google'; nickname?: string }>());

export const signInSuccess = createAction('[Auth] sign in success', props<{ user: User }>());

export const signOut = createAction('[Auth] sign out');

export const signOutSuccess = createAction('[Auth] sign out success');
