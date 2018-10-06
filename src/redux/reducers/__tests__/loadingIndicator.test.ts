import { ActionType, DataLoaderActionSubtype } from '../../actions';
import createLoadingIndicatorReducer, {
  LoadingIndicatorState,
  LoadingState
} from '../loadingIndicator';

test('reduceFromInitialToLoading', () => {
  const reducer = createLoadingIndicatorReducer(
    DataLoaderActionSubtype.CURRENT_USER
  );
  const state = reducer(
    { loadingState: LoadingState.INITIAL, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_LOADING,
      subType: DataLoaderActionSubtype.CURRENT_USER,
      payload: undefined
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.LOADING,
    errorMessage: ''
  };
  expect(state).toEqual(expectedState);
});

test('reduceFromLoadingToCompleted', () => {
  const reducer = createLoadingIndicatorReducer(
    DataLoaderActionSubtype.CURRENT_USER
  );
  const state = reducer(
    { loadingState: LoadingState.LOADING, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_COMPLETED,
      subType: DataLoaderActionSubtype.CURRENT_USER,
      payload: undefined
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.COMPLETED,
    errorMessage: ''
  };
  expect(state).toEqual(expectedState);
});

test('reduceFromLoadingToError', () => {
  const reducer = createLoadingIndicatorReducer(
    DataLoaderActionSubtype.CURRENT_USER
  );
  const state = reducer(
    { loadingState: LoadingState.LOADING, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_ERROR,
      subType: DataLoaderActionSubtype.CURRENT_USER,
      payload: 'Some error'
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.ERROR,
    errorMessage: 'Some error'
  };
  expect(state).toEqual(expectedState);
});
