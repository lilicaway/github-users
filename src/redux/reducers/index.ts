import { combineReducers, Reducer } from 'redux';
import { GitHubUsersAction } from '../actions';
import currentUserReducer, {
  CurrentUserApi,
  CurrentUserState
} from './gitHubCurrentUserDetails';
import usersReducer, { GitHubUsersApi, UsersState } from './gitHubUsers';

export interface GitHubUsersState {
  users: UsersState;
  currentUser: CurrentUserState;
}

const reducers: Reducer<GitHubUsersState, GitHubUsersAction> = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer
});

export default reducers;

// Selectors

export const gitHubUsersApi = (state: GitHubUsersState) => {
  return new GitHubUsersApi(state.users);
};

export const currentUserApi = (state: GitHubUsersState) => {
  return new CurrentUserApi(state.currentUser);
};
