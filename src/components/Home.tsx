import * as React from 'react';
import { Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.SFC = () => (
  <div>
    <Panel className="container-fluid">
      <h2>Features</h2>
      <p>
        The app has one module. The <Link to="/users">Users</Link> module, where
        you can see the list of GitHub Users. The list shows User Cards, and at
        the bottom you can choose to display more users by clicking the button
        displayed as <Button>Load More...</Button>
      </p>
      <p>
        From there, it is possible to navigate back to the User Details clicking
        the button displayed as <Button bsStyle="primary">User details</Button>
      </p>
      <h2>Limitations</h2>
      Since this is mostly a demo app, there are some limitations.
      <ul>
        <li>
          <strong>Pagination or Show more users functionality</strong> is
          implemented but there is no implementation to reduce the number of
          users that is being displayed (except for refreshing the page and
          starting over).
        </li>
        <li>
          <strong>Styling:</strong>{' '}
          <a
            href="http://getbootstrap.com/css"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bootstrap
          </a>{' '}
          and{' '}
          <a
            href="https://react-bootstrap.github.io/components.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-bootstrap
          </a>{' '}
          are the only things being used for styling the app. No custom .css
          file was written, so the application doesn't look perfect everywhere.
        </li>
        <li>
          <strong>Tests:</strong> there are examples of different types of
          tests, but not everything is being tested.
        </li>
        <li>
          <strong>TypeScript: </strong>
          some parts in the TypeScript could be improved. There are some parts
          marked as TODO with some castings where perhaps better typing could
          help.
        </li>
      </ul>
    </Panel>
  </div>
);

export default Home;
