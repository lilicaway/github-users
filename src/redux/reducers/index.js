import { combineReducers } from 'redux';
import usersReducer, * as gitHubUsersApi from './gitHubUsers';
import currentUserReducer, * as currentUserApi from './gitHubCurrentUserDetails';

const reducers = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
});

export default reducers;

// Selectors

export const getUsers = state => {
  return gitHubUsersApi.getUsers(state.users);
};

export const getUsersNextLink = state => {
  return gitHubUsersApi.getUsersNextLink(state.users);
};

export const getUsersLoadingState = state => {
  return gitHubUsersApi.getLoadingState(state.users);
};

export const getUsersLoadingErrorMessage = state => {
  return gitHubUsersApi.getErrorMessage(state.users);
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
