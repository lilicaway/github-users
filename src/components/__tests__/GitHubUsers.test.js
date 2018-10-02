import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GitHubUsers, {
  UnwrappedGitHubUsersForTest,
  UserCardForTest,
} from '../GitHubUsers';
import { Button } from 'react-bootstrap';
import { LoadingState } from '../../redux/reducers/loadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

const USERS = [
  {
    login: 'mojombo',
    id: 1,
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/mojombo',
    html_url: 'https://github.com/mojombo',
  },
  {
    login: 'defunkt',
    id: 2,
    avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/defunkt',
    html_url: 'https://github.com/defunkt',
  },
  {
    login: 'pjhyett',
    id: 3,
    avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/pjhyett',
    html_url: 'https://github.com/pjhyett',
  },
];

let component;
let loadMoreUsersFunctionMock;

beforeEach(() => {
  loadMoreUsersFunctionMock = jest.fn();
  component = shallow(
    <UnwrappedGitHubUsersForTest
      users={USERS}
      loadingState={LoadingState.COMPLETED}
      errorMessage={''}
      nextLink={'someNextLink'}
      loadUsers={() => {}}
      loadMoreUsers={loadMoreUsersFunctionMock}
    />
  );
});

test('GitHub Users are shown correctly', () => {
  expect(component).toMatchSnapshot();
  expect(component.find(UserCardForTest).length).toEqual(USERS.length);
});

test('More Users can be loaded', () => {
  expect(loadMoreUsersFunctionMock.mock.calls.length).toBe(0);
  component.find(Button).simulate('click');
  expect(loadMoreUsersFunctionMock.mock.calls.length).toBe(1);
  expect(loadMoreUsersFunctionMock.mock.calls[0][0]).toBe('someNextLink');
});
