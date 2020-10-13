import { gql } from "@apollo/client";
import client from "../client";
import {
  SEARCH_VALUE,
  SEARCH_SHWO_HISTORY,
  SEARCH_REPO_REQUEST,
  SEARCH_REPO_SUCCESS,
  SEARCH_REPO_FAILURE,
  SEARCH_CLEAR_REPO,
  SEARCH_REPO_HISTORY,
  SEARCH_REPO_HISTORY_CLEAR,
} from "../types";

import {
  getQueryString,
  getLocalHistoryStorage,
  setLocalHistoryStorage,
  clearLocalHistoryStorage,
} from "../utils/helper";

const setLoading = (dispatch) => dispatch({ type: SEARCH_REPO_REQUEST });

const clearRepo = (dispatch) => dispatch({ type: SEARCH_CLEAR_REPO });

const setError = (dispatch, error) => {
  dispatch({
    type: SEARCH_REPO_FAILURE,
    error: error,
  });
};

const setShowHistory= (dispatch, isShow) => {
  dispatch({
    type: SEARCH_SHWO_HISTORY,
    payload: isShow,
  });
};

const setSearchValue = (dispatch, data) => {
  dispatch({
    type: SEARCH_VALUE,
    payload: data,
  });
};

const setSearchHistory = (dispatch, data) => {
  const { searchValue } = data;
  setLocalHistoryStorage(searchValue);
  dispatch({
    type: SEARCH_REPO_HISTORY,
    payload: searchValue,
  });
};

const clearSearchHistory = (dispatch) => {
  clearLocalHistoryStorage();
  dispatch({
    type: SEARCH_REPO_HISTORY_CLEAR,
  });
};

const setSearchResult = (dispatch, data) => {
  dispatch({
    type: SEARCH_REPO_SUCCESS,
    payload: data,
  });
};

const searchGithub = (dispatch, params) => {
  const { searchValue, hasNextPage } = params;
  if (hasNextPage === false || !searchValue) {
    return;
  }
  setLoading(dispatch);
  const sqlString = getQueryString(params);
  return client
    .query({
      query: gql`
        query {
          search(${sqlString}) {
            repositoryCount
            pageInfo {
              hasNextPage
              endCursor
              startCursor
            }
            edges {
              node {
                ... on Repository {
                  id
                  url
                  nameWithOwner
                  name
                  createdAt
                  description
                  descriptionHTML
                  forkCount
                  updatedAt
                }
              }
            }
          }
        }
      `,
    })
    .then((res) => {
      setSearchResult(dispatch, res.data);
      setSearchHistory(dispatch, params);
      setShowHistory(dispatch,false);
    })
    .catch((error) => {
      setError(dispatch, error);
    });
};

export {
  setLoading,
  clearRepo,
  setError,
  setShowHistory,
  setSearchValue,
  searchGithub,
  setSearchResult,
  getQueryString,
  setSearchHistory,
  clearSearchHistory,
  getLocalHistoryStorage
};
