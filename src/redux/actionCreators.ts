import axios, { AxiosResponse } from 'axios';
import * as linkParser from 'parse-link-header';
import { Dispatch } from 'redux';
import { GitHubUser } from '../types/GitHubUser';
import {
  ActionType,
  DataLoaderActionSubtype,
  GitHubUsersAction
} from './actions';

export const setDataAsLoading = (
  actionSubtype: DataLoaderActionSubtype
): GitHubUsersAction => {
  return {
    type: ActionType.DATA_LOADER_LOADING,
    subType: actionSubtype,
    payload: undefined
  };
};

export const setDataAsError = (
  error: string,
  actionSubtype: DataLoaderActionSubtype
): GitHubUsersAction => {
  return {
    type: ActionType.DATA_LOADER_ERROR,
    subType: actionSubtype,
    payload: error
  };
};

export const setDataAsCompleted = (
  actionSubtype: DataLoaderActionSubtype
): GitHubUsersAction => {
  return {
    type: ActionType.DATA_LOADER_COMPLETED,
    subType: actionSubtype,
    payload: undefined
  };
};

export const addAllUsers = (
  users: GitHubUser[],
  nextLink: string
): GitHubUsersAction => {
  return {
    type: ActionType.ADD_ALL_USERS,
    payload: {
      users,
      nextLink
    }
  };
};

export const setCurrentUser = (user: GitHubUser): GitHubUsersAction => {
  return {
    type: ActionType.SET_CURRENT_USER,
    payload: user
  };
};

export const loadUsers = (nextLink?: string) => {
  const url = nextLink || 'https://api.github.com/users';
  // Returns a thunk
  return (dispatch: Dispatch<GitHubUsersAction>) => {
    dispatch(setDataAsLoading(DataLoaderActionSubtype.USERS));
    axios
      .get<GitHubUser[]>(url)
      .then((response: AxiosResponse<GitHubUser[]>) => {
        dispatch(
          addAllUsers(response.data, getNextLink(response.headers.link))
        );
        dispatch(setDataAsCompleted(DataLoaderActionSubtype.USERS));
      })
      .catch(error => {
        dispatch(
          setDataAsError(error.toString(), DataLoaderActionSubtype.USERS)
        );
      });
  };
};

export const loadUser = (username: string) => {
  // Returns a thunk
  return (dispatch: Dispatch<GitHubUsersAction>) => {
    dispatch(setDataAsLoading(DataLoaderActionSubtype.CURRENT_USER));
    axios
      .get<GitHubUser>(`https://api.github.com/users/${username}`)
      .then((response: AxiosResponse<GitHubUser>) => {
        dispatch(setCurrentUser(response.data));
        dispatch(setDataAsCompleted(DataLoaderActionSubtype.CURRENT_USER));
      })
      .catch(error => {
        dispatch(
          setDataAsError(error.toString(), DataLoaderActionSubtype.CURRENT_USER)
        );
      });
  };
};

const getNextLink = (linkHeader: string): string => {
  const link = linkParser(linkHeader);
  if (link !== null) {
    return link.next.url;
  }
  // No next link.
  return '';
};
