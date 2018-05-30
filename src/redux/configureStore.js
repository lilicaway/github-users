import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
  return store;
};

export default configureStore;
