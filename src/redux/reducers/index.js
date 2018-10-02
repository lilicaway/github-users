import { combineReducers } from 'redux';
import usersReducer, { GitHubUsersApi } from './gitHubUsers';
import currentUserReducer, { CurrentUserApi } from './gitHubCurrentUserDetails';

const reducers = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
});

export default reducers;

// Selectors

export const gitHubUsersApi = state => {
  return new GitHubUsersApi(state.users);
};

export const currentUserApi = state => {
  return new CurrentUserApi(state.currentUser);
}
