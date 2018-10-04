import { Reducer } from 'redux';
import {
  ActionType,
  DataLoaderActionSubtype,
  GitHubUsersAction
} from '../actions';

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
  actionSubtype: DataLoaderActionSubtype
): Reducer<LoadingIndicatorState, GitHubUsersAction> => {
  return (
    state = {
      loadingState: LoadingState.INITIAL,
      errorMessage: ''
    },
    action
  ) => {
    switch (action.type) {
      case ActionType.DATA_LOADER_LOADING:
        if (action.subType === actionSubtype) {
          return {
            ...state,
            loadingState: LoadingState.LOADING,
            errorMessage: ''
          };
        }
        break;
      case ActionType.DATA_LOADER_COMPLETED:
        if (action.subType === actionSubtype) {
          return {
            ...state,
            loadingState: LoadingState.COMPLETED,
            errorMessage: ''
          };
        }
        break;
      case ActionType.DATA_LOADER_ERROR:
        if (action.subType === actionSubtype) {
          return {
            ...state,
            loadingState: LoadingState.ERROR,
            errorMessage: action.payload
          };
        }
        break;
    }
    return state;
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
