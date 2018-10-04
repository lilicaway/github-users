import { combineReducers, Reducer } from 'redux';
import { GitHubUser } from '../../types/GitHubUser';
import {
  ActionType,
  DataLoaderActionSubtype,
  GitHubUsersAction
} from '../actions';
import createLoadingIndicatorReducer, * as loadingIndicatorApi from './loadingIndicator';

const usersListReducer: Reducer<GitHubUser[], GitHubUsersAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ActionType.ADD_ALL_USERS:
      return state.concat(action.payload.users);
    default:
      return state;
  }
};

const nextLinkReducer: Reducer<string, GitHubUsersAction> = (
  state = '',
  action
) => {
  switch (action.type) {
    case ActionType.ADD_ALL_USERS:
      return action.payload.nextLink;
    default:
      return state;
  }
};

interface UsersState {
  list: GitHubUser[];
  nextLink: string;
  loadingIndicator: loadingIndicatorApi.LoadingIndicatorState;
}

const usersReducer: Reducer<UsersState, GitHubUsersAction> = combineReducers({
  list: usersListReducer,
  nextLink: nextLinkReducer,
  loadingIndicator: createLoadingIndicatorReducer(DataLoaderActionSubtype.USERS)
});
export default usersReducer;

// Selectors

export class GitHubUsersApi {
  constructor(private readonly state: UsersState) {}
  public getUsers(): GitHubUser[] {
    return this.state.list;
  }
  public getNextLink(): string {
    return this.state.nextLink;
  }
  public getLoadingState(): loadingIndicatorApi.LoadingState {
    return loadingIndicatorApi.getLoadingState(this.state.loadingIndicator);
  }
  public getErrorMessage(): string {
    return loadingIndicatorApi.getLoadingDataErrorMessage(
      this.state.loadingIndicator
    );
  }
}
