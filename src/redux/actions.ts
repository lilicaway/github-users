import { Action } from 'redux';
import { GitHubUser } from '../types/GitHubUser';

export enum ActionType {
  DATA_LOADER_LOADING = 'DATA_LOADER_LOADING',
  DATA_LOADER_COMPLETED = 'DATA_LOADER_COMPLETED',
  DATA_LOADER_ERROR = 'DATA_LOADER_ERROR',

  ADD_ALL_USERS = 'ADD_ALL_USERS',
  SET_CURRENT_USER = 'SET_CURRENT_USER'
}

export enum DataLoaderActionSubtype {
  USERS = 'USERS',
  CURRENT_USER = 'CURRENT_USER'
}

export interface DataLoaderLoadingAction
  extends Action<ActionType.DATA_LOADER_LOADING> {
  subType: DataLoaderActionSubtype;
  payload: undefined;
}

export interface DataLoaderErrorAction
  extends Action<ActionType.DATA_LOADER_ERROR> {
  subType: DataLoaderActionSubtype;
  payload: string;
}

export interface DataLoaderCompletedAction
  extends Action<ActionType.DATA_LOADER_COMPLETED> {
  subType: DataLoaderActionSubtype;
  payload: undefined;
}

export interface AddAllUsersAction extends Action<ActionType.ADD_ALL_USERS> {
  payload: {
    users: GitHubUser[];
    nextLink: string;
  };
}

export interface SetCurrentUserAction
  extends Action<ActionType.SET_CURRENT_USER> {
  payload: GitHubUser;
}

export type GitHubUsersAction =
  | DataLoaderLoadingAction
  | DataLoaderErrorAction
  | DataLoaderCompletedAction
  | AddAllUsersAction
  | SetCurrentUserAction;
