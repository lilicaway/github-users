/* tslint:disable:ordered-imports */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
/* tslint:enable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import App from './App';
import './index.css';
import { GitHubUsersAction } from './redux/actions';
import configureStore from './redux/configureStore';
import { GitHubUsersState } from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

const store: Store<GitHubUsersState, GitHubUsersAction> = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
