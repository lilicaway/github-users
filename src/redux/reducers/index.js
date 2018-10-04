import { combineReducers } from 'redux';
import currentUserReducer, { CurrentUserApi } from './gitHubCurrentUserDetails';
import usersReducer, { GitHubUsersApi } from './gitHubUsers';

const reducers = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer
});

export default reducers;

// Selectors

export const gitHubUsersApi = state => {
  return new GitHubUsersApi(state.users);
};

export const currentUserApi = state => {
  return new CurrentUserApi(state.currentUser);
};
