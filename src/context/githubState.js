import React, { useReducer } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "../reducer/githubReducer";
import {
  clearRepo,
  searchGithub,
  setSearchValue,
  setShowHistory,
  clearSearchHistory,
  getLocalHistoryStorage,
} from "../actions/GithubAction";

const GithubState = (props) => {
  const initialState = {
    loading: false,
    searchValue: "",
    repoList: [],
    repoResult: {},
    historySearch: getLocalHistoryStorage(),
    errorMessage: null,
    showHistory: true,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        repoList: state.repoList,
        repoResult: state.repoResult,
        searchValue: state.searchValue,
        errorMessage: state.errorMessage,
        showHistory: state.showHistory,
        historySearch: state.historySearch,
        clearRepo: () => clearRepo(dispatch),
        clearSearchHistory: () => clearSearchHistory(dispatch),
        searchGithub: (params) => searchGithub(dispatch, params),
        setShowHistory: (value) => setShowHistory(dispatch, value),
        setSearchValue: (value) => setSearchValue(dispatch, value),
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
