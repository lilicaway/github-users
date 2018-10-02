import * as actionType from './actions';
import axios from 'axios';
import linkParser from 'parse-link-header';

export const setDataAsLoading = actionPrefix => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_LOADING}`,
    payload: undefined,
  };
};

export const setDataAsError = (error, actionPrefix) => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_ERROR}`,
    payload: error,
  };
};

export const setDataAsCompleted = actionPrefix => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_COMPLETED}`,
    payload: undefined,
  };
};

export const addAllUsers = (users, nextLink) => {
  return { type: actionType.ADD_ALL_USERS, payload: { users, nextLink } };
};

export const setCurrentUser = user => {
  return { type: actionType.SET_CURRENT_USER, payload: user };
};

export const loadUsers = (nextLink?: string) => {
  const url = nextLink || 'https://api.github.com/users';
  return dispatch => {
    dispatch(setDataAsLoading('USERS'));
    axios
      .get(url)
      .then(response => {
        dispatch(
          addAllUsers(response.data, getNextLink(response.headers.link))
        );
        dispatch(setDataAsCompleted('USERS'));
      })
      .catch(error => {
        dispatch(setDataAsError(error.toString(), 'USERS'));
      });
  };
};

export const loadUser = username => {
  return dispatch => {
    dispatch(setDataAsLoading('CURRENT_USER'));
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(response => {
        dispatch(setCurrentUser(response.data));
        dispatch(setDataAsCompleted('CURRENT_USER'));
      })
      .catch(error => {
        dispatch(setDataAsError(error.toString(), 'CURRENT_USER'));
      });
  };
};

const getNextLink = linkHeader => {
  const link = linkParser(linkHeader);
  return link.next.url;
};
