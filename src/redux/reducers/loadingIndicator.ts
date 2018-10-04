import { Reducer } from 'redux';
import { GitHubUsersAction } from '../../types/GitHubUsersAction';
import * as actionType from '../actions';

export enum LoadingState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface LoadingIndicatorState {
  loadingState: LoadingState;
  errorMessage: string;
}

const createLoadingIndicatorReducer = (
  actionPrefix: string
): Reducer<LoadingIndicatorState, GitHubUsersAction> => {
  return (
    state = {
      loadingState: LoadingState.INITIAL,
      errorMessage: ''
    },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_${actionType.DATA_LOADER_LOADING}`:
        return {
          ...state,
          loadingState: LoadingState.LOADING,
          errorMessage: ''
        };
      case `${actionPrefix}_${actionType.DATA_LOADER_COMPLETED}`:
        return {
          ...state,
          loadingState: LoadingState.COMPLETED,
          errorMessage: ''
        };
      case `${actionPrefix}_${actionType.DATA_LOADER_ERROR}`:
        const errorMessage =
          action.payload === undefined
            ? 'Unknown Error'
            : action.payload.toString();
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          errorMessage
        };
      default:
        return state;
    }
  };
};

export default createLoadingIndicatorReducer;

// Selectors

export const getLoadingState = (state: LoadingIndicatorState): LoadingState => {
  return state.loadingState;
};

export const getLoadingDataErrorMessage = (
  state: LoadingIndicatorState
): string => {
  return state.errorMessage;
};
