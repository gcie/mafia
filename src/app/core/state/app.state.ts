import { User } from '../models/user';

export interface State {
  app: AppState;
}

export interface AppState {
  auth: AuthState;
  createdGameToken?: string;
}

export interface AuthState {
  resolved: boolean;
  user: User;
}

export const initialState: AppState = { auth: { resolved: false, user: null } };
