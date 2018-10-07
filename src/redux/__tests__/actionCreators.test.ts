import * as moxios from 'moxios';
import * as actionCreatorsAPI from '../actionCreators';
import { DataLoaderActionSubtype } from '../actions';
import * as allUsersJson from './allUsers.json';
import * as currentUserJson from './currentUser.json';

test('setDataAsLoading for github list of users', () => {
  expect(
    actionCreatorsAPI.setDataAsLoading(DataLoaderActionSubtype.USERS)
  ).toMatchSnapshot();
});

test('setDataAsLoading for the current user details', () => {
  expect(
    actionCreatorsAPI.setDataAsLoading(DataLoaderActionSubtype.CURRENT_USER)
  ).toMatchSnapshot();
});

test('setDataAsError for github list of users', () => {
  expect(
    actionCreatorsAPI.setDataAsError(
      'Some error',
      DataLoaderActionSubtype.USERS
    )
  ).toMatchSnapshot();
});

test('setDataAsError for the current user details', () => {
  expect(
    actionCreatorsAPI.setDataAsError(
      'Some error',
      DataLoaderActionSubtype.CURRENT_USER
    )
  ).toMatchSnapshot();
});

test('setDataAsCompleted for github list of users', () => {
  expect(
    actionCreatorsAPI.setDataAsCompleted(DataLoaderActionSubtype.USERS)
  ).toMatchSnapshot();
});

test('setDataAsCompleted for the current user details', () => {
  expect(
    actionCreatorsAPI.setDataAsCompleted(DataLoaderActionSubtype.CURRENT_USER)
  ).toMatchSnapshot();
});

test('addAllUsers', () => {
  const nextLink = 'https://api.github.com/users?since=3';
  expect(
    actionCreatorsAPI.addAllUsers(allUsersJson, nextLink)
  ).toMatchSnapshot();
});

test('setCurrentUser', () => {
  expect(actionCreatorsAPI.setCurrentUser(currentUserJson)).toMatchSnapshot();
});

test('loadUsers', done => {
  const expectedUsers = allUsersJson;
  const dispatchMock = jest.fn();

  moxios.withMock(() => {
    const thunk = actionCreatorsAPI.loadUsers();
    thunk(dispatchMock);

    moxios.wait(() => {
      try {
        expect(dispatchMock).toBeCalledWith(
          actionCreatorsAPI.setDataAsLoading(DataLoaderActionSubtype.USERS)
        );
        const allUsersRequest = moxios.requests.mostRecent();
        allUsersRequest
          .respondWith({
            status: 200,
            response: expectedUsers,
            headers: {
              link:
                '<https://api.github.com/users?since=46>; rel="next",' +
                ' <https://api.github.com/users{?since}>; rel="first"'
            }
          })
          .then(() => {
            expect(allUsersRequest.url).toEqual('https://api.github.com/users');
            expect(dispatchMock).toBeCalledWith(
              actionCreatorsAPI.addAllUsers(
                expectedUsers,
                'https://api.github.com/users?since=46'
              )
            );
            done();
          })
          .catch(done.fail); // https://jasmine.github.io/2.3/introduction.html#section-54
      } catch (e) {
        done.fail(e);
      }
    });
  });
});

test('loadUser', done => {
  const expectedUser = currentUserJson;
  const dispatchMock = jest.fn();

  moxios.withMock(() => {
    const thunk = actionCreatorsAPI.loadUser('jnewland');
    thunk(dispatchMock);

    moxios.wait(() => {
      try {
        expect(dispatchMock).toBeCalledWith(
          actionCreatorsAPI.setDataAsLoading(
            DataLoaderActionSubtype.CURRENT_USER
          )
        );
        const currentUserRequest = moxios.requests.mostRecent();
        currentUserRequest
          .respondWith({
            status: 200,
            response: expectedUser
          })
          .then(() => {
            expect(currentUserRequest.url).toEqual(
              'https://api.github.com/users/jnewland'
            );
            expect(dispatchMock).toBeCalledWith(
              actionCreatorsAPI.setCurrentUser(expectedUser)
            );
            done();
          })
          .catch(done.fail); // https://jasmine.github.io/2.3/introduction.html#section-54
      } catch (e) {
        done.fail(e);
      }
    });
  });
});
