import * as actionType from '../actions';
import { combineReducers } from 'redux';
import createLoadingIndicatorReducer, * as loadingIndicatorApi from './loadingIndicator';

const usersListReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.ADD_ALL_USERS:
      return state.concat(action.payload.users);
    default:
      return state;
  }
};

const nextLinkReducer = (state = '', action) => {
  switch (action.type) {
    case actionType.ADD_ALL_USERS:
      return action.payload.nextLink;
    default:
      return state;
  }
};

const usersReducer = combineReducers({
  list: usersListReducer,
  nextLink: nextLinkReducer,
  loadingIndicator: createLoadingIndicatorReducer('USERS'),
});
export default usersReducer;

// Selectors

export const getUsers = state => {
  return state.list;
};

export const getUsersNextLink = state => {
  return state.nextLink;
};

export const getLoadingState = state => {
  return loadingIndicatorApi.getLoadingState(state.loadingIndicator);
};

export const getErrorMessage = state => {
  return loadingIndicatorApi.getLoadingDataErrorMessage(state.loadingIndicator);
};
