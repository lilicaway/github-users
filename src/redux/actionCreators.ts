import axios, { AxiosResponse } from 'axios';
import * as linkParser from 'parse-link-header';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GitHubUser } from '../types/GitHubUser';
import { GitHubUsersAction } from '../types/GitHubUsersAction';
import * as actionType from './actions';

export const setDataAsLoading: ActionCreator<GitHubUsersAction> = (actionPrefix: string) => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_LOADING}`,
    payload: undefined,
  };
};

export const setDataAsError: ActionCreator<GitHubUsersAction> = (error: string, actionPrefix: string) => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_ERROR}`,
    payload: error,
  };
};

export const setDataAsCompleted: ActionCreator<GitHubUsersAction> = (actionPrefix: string) => {
  return {
    type: `${actionPrefix}_${actionType.DATA_LOADER_COMPLETED}`,
    payload: undefined,
  };
};

export const addAllUsers: ActionCreator<GitHubUsersAction> = (users: GitHubUser[], nextLink: string) => {
  return {
    type: actionType.ADD_ALL_USERS,
    payload: {
      users,
      nextLink
    }
  };
};

export const setCurrentUser: ActionCreator<GitHubUsersAction> = (user: GitHubUser) => {
  return {
    type: actionType.SET_CURRENT_USER,
    payload: user
  };
};

export const loadUsers: ActionCreator<ThunkAction<void, void, void, GitHubUsersAction>> =
  (nextLink?: string) => {
    const url = nextLink || 'https://api.github.com/users';
    return (dispatch: Dispatch<Action<string>>) => {
      dispatch(setDataAsLoading('USERS'));
      axios
        .get<GitHubUser[]>(url)
        .then((response: AxiosResponse<GitHubUser[]>) => {
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

export const loadUser: ActionCreator<ThunkAction<void, void, void, GitHubUsersAction>> =
  (username: string) => {
    return (dispatch: Dispatch<Action<string>>) => {
      dispatch(setDataAsLoading('CURRENT_USER'));
      axios
        .get<GitHubUser>(`https://api.github.com/users/${username}`)
        .then((response: AxiosResponse<GitHubUser>) => {
          dispatch(setCurrentUser(response.data));
          dispatch(setDataAsCompleted('CURRENT_USER'));
        })
        .catch(error => {
          dispatch(setDataAsError(error.toString(), 'CURRENT_USER'));
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
