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
  loadingIndicator: createLoadingIndicatorReducer('USERS')
});
export default usersReducer;

// Selectors

export class GitHubUsersApi {
  constructor(state) {
    this.state = state;
  }

  getUsers() {
    return this.state.list;
  }
  getNextLink() {
    return this.state.nextLink;
  }
  getLoadingState() {
    return loadingIndicatorApi.getLoadingState(this.state.loadingIndicator);
  }
  getErrorMessage() {
    return loadingIndicatorApi.getLoadingDataErrorMessage(
      this.state.loadingIndicator
    );
  }
}
