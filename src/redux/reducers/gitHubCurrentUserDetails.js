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
  loadingIndicator: createLoadingIndicatorReducer('CURRENT_USER'),
});

export default currentUserReducer;

// Selectors

export const getCurrentUser = state => {
  return state.user;
};

export const getCurrentUserLoadingState = state => {
  return loadingIndicatorApi.getLoadingState(state.loadingIndicator);
};

export const getCurrentUserLoadingErrorMessage = state => {
  return loadingIndicatorApi.getLoadingDataErrorMessage(state.loadingIndicator);
};
