import * as React from 'react';
import './App.css';

import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import { Store } from 'redux';
import GitHubCurrentUserDetails from './components/GitHubCurrentUserDetails';
import GitHubUsers from './components/GitHubUsers';
import Home from './components/Home';
import { GitHubUsersAction } from './redux/actions';
import { AppState } from './redux/reducers';

const FourOhFour = () => <h1>404</h1>;

interface Props {
  store: Store<AppState, GitHubUsersAction>;
}

const App: React.SFC<Props> = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar inverse={true} fixedTop={true}>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">GitHub Users</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer exact={true} to="/">
                  <NavItem eventKey={1}>
                    <span className="glyphicon glyphicon-home" />
                    &nbsp;Home
                  </NavItem>
                </LinkContainer>
                <LinkContainer exact={true} to="/users">
                  <NavItem eventKey={2}>
                    <span className="glyphicon glyphicon-user" />
                    &nbsp;Users
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        <Grid>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/users" exact={true} component={GitHubUsers} />
            <Route
              path="/user/:username"
              exact={true}
              component={GitHubCurrentUserDetails}
            />
            <Route component={FourOhFour} />
          </Switch>
        </Grid>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
