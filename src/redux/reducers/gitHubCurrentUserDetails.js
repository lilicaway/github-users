import * as actionType from '../actions';
import { combineReducers } from 'redux';
import createLoadingIndicatorReducer, * as loadingIndicatorApi from './loadingIndicator';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

const currentUserReducer = combineReducers({
  user: userReducer,
  loadingIndicator: createLoadingIndicatorReducer('CURRENT_USER')
});

export default currentUserReducer;

// Selectors

export class CurrentUserApi {
  constructor(state) {
    this.state = state;
  }

  getCurrentUser() {
    return this.state.user;
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
