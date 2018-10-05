import { combineReducers, Reducer } from 'redux';
import { GitHubUsersAction } from '../actions';
import currentUserReducer, {
  CurrentUserApi,
  CurrentUserState
} from './gitHubCurrentUserDetails';
import usersReducer, { GitHubUsersApi, UsersState } from './gitHubUsers';

export interface AppState {
  users: UsersState;
  currentUser: CurrentUserState;
}

const reducers: Reducer<AppState, GitHubUsersAction> = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer
});

export default reducers;

// Selectors

export const gitHubUsersApi = (state: AppState) => {
  return new GitHubUsersApi(state.users);
};

export const currentUserApi = (state: AppState) => {
  return new CurrentUserApi(state.currentUser);
};
