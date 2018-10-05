import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { GitHubUsersAction } from './actions';
import reducers, { GitHubUsersState } from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  const store: Store<GitHubUsersState, GitHubUsersAction> = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;