import createLoadingIndicatorReducer from '../loadingIndicator';

test('reduceFromInitialToLoading', () => {
  const reducer = createLoadingIndicatorReducer('SOME_PREFIX');
  const state = reducer(
    { loadingState: 'INITIAL', errorMessage: '' },
    { type: 'SOME_PREFIX_DATA_LOADER_LOADING' }
  );
  expect(state).toEqual({ loadingState: 'LOADING', errorMessage: '' });
});

test('reduceFromLoadingToCompleted', () => {
  const reducer = createLoadingIndicatorReducer('SOME_PREFIX');
  const state = reducer(
    { loadingState: 'LOADING', errorMessage: '' },
    { type: 'SOME_PREFIX_DATA_LOADER_COMPLETED' }
  );
  expect(state).toEqual({ loadingState: 'COMPLETED', errorMessage: '' });
});

test('reduceFromLoadingToError', () => {
  const reducer = createLoadingIndicatorReducer('SOME_PREFIX');
  const state = reducer(
    { loadingState: 'LOADING', errorMessage: '' },
    { type: 'SOME_PREFIX_DATA_LOADER_ERROR', payload: 'Some error' }
  );
  expect(state).toEqual({ loadingState: 'ERROR', errorMessage: 'Some error' });
});
