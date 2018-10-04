import { combineReducers, Reducer } from 'redux';
import { GitHubUser } from '../../types/GitHubUser';
import { GitHubUsersAction } from '../../types/GitHubUsersAction';
import * as actionType from '../actions';
import createLoadingIndicatorReducer, * as loadingIndicatorApi from './loadingIndicator';

export type UserState = GitHubUser | null;

const userReducer: Reducer<UserState, GitHubUsersAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case actionType.SET_CURRENT_USER:
      // TODO: figure out a way to have properly typed payload
      return (action.payload as {}) as GitHubUser;
    default:
      return state;
  }
};

interface CurrentUserState {
  user: UserState;
  loadingIndicator: loadingIndicatorApi.LoadingIndicatorState;
}

const currentUserReducer: Reducer<
  CurrentUserState,
  GitHubUsersAction
> = combineReducers({
  user: userReducer,
  loadingIndicator: createLoadingIndicatorReducer('CURRENT_USER')
});

export default currentUserReducer;

// Selectors

export class CurrentUserApi {
  constructor(private readonly state: CurrentUserState) {}

  public getCurrentUser(): GitHubUser | undefined {
    return this.state.user || undefined;
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
