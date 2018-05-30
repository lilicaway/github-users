import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import { Grid, NavItem, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './components/Home';
import GitHubUsers from './components/GitHubUsers';
import GitHubCurrentUserDetails from './components/GitHubCurrentUserDetails';

const FourOhFour = () => <h1>404</h1>;

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">GitHub Users</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer exact to="/">
                  <NavItem eventKey={1}>
                    <span className="glyphicon glyphicon-home" />&nbsp;Home
                  </NavItem>
                </LinkContainer>
                <LinkContainer exact to="/users">
                  <NavItem eventKey={2}>
                    <span className="glyphicon glyphicon-user" />&nbsp;Users
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        {/* <Jumbotron>
          <Grid>
            <h1>GitHub Users</h1>
          </Grid>
        </Jumbotron> */}
        <Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={GitHubUsers} />
            <Route
              path="/user/:username"
              exact
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
