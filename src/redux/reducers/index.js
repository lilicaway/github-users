import { combineReducers } from 'redux';
import usersReducer, { GitHubUsersApi } from './gitHubUsers';
import currentUserReducer, * as currentUserApi from './gitHubCurrentUserDetails';

const reducers = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
});

export default reducers;

// Selectors

export const gitHubUsersApi = state => {
  return new GitHubUsersApi(state.users);
};

export const getCurrentUser = state => {
  return currentUserApi.getCurrentUser(state.currentUser);
};

export const getCurrentUserLoadingState = state => {
  return currentUserApi.getCurrentUserLoadingState(state.currentUser);
};

export const getCurrentUserLoadingErrorMessage = state => {
  return currentUserApi.getCurrentUserLoadingErrorMessage(state.currentUser);
};
