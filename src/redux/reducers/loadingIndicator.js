import * as actionType from '../actions';

export const LoadingState = Object.freeze({
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
});

const createLoadingIndicatorReducer = actionPrefix => {
  return (
    state = { loadingState: LoadingState.INITIAL, errorMessage: '' },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_${actionType.DATA_LOADER_LOADING}`:
        return {
          ...state,
          loadingState: LoadingState.LOADING,
          errorMessage: '',
        };
      case `${actionPrefix}_${actionType.DATA_LOADER_COMPLETED}`:
        return {
          ...state,
          loadingState: LoadingState.COMPLETED,
          errorMessage: '',
        };
      case `${actionPrefix}_${actionType.DATA_LOADER_ERROR}`:
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
};

export default createLoadingIndicatorReducer;

// Selectors

export const getLoadingState = state => {
  return state.loadingState;
};

export const getLoadingDataErrorMessage = state => {
  return state.errorMessage;
};
