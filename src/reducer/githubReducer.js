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

import { isExitHistory } from "../utils/helper";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_REPO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_REPO_SUCCESS:
      return {
        ...state,
        loading: false,
        repoList: [...action.payload.search.edges, ...state.repoList],
        repoResult: action.payload,
      };
    case SEARCH_REPO_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case SEARCH_VALUE:
      return {
        ...state,
        loading: false,
        searchValue: action.payload,
      };
    case SEARCH_CLEAR_REPO:
      return {
        ...state,
        repoList: [],
        repoResult: {},
        errorMessage: null,
      };
    case SEARCH_REPO_HISTORY:
      if (!isExitHistory(action.payload, state.historySearch)) {
        return {
          ...state,
          historySearch: [action.payload, ...state.historySearch],
        };
      }
      return state;

    case SEARCH_REPO_HISTORY_CLEAR:
      return {
        ...state,
        historySearch: [],
      };
    case SEARCH_SHWO_HISTORY:
      return {
        ...state,
        showHistory: action.payload,
      };
    default:
      return state;
  }
};
