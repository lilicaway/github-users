import { Action } from 'redux';

export interface GitHubUsersAction extends Action<string> {
  payload: object | string | undefined;
}
