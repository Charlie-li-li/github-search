import { SEARCH_REPO_HISTORY } from "../types";
import { MAX_COUNT } from "../constantes";

const isExitHistory = (value, arr) => {
  return arr.filter((item) => item === value).length;
};

const getQueryString = (params) => {
  let sqlString = `query: "${params.searchValue}", type: REPOSITORY, first: ${MAX_COUNT}`;
  if (params.endCursor && params.hasNextPage) {
    sqlString = `query:"${params.searchValue}", type: REPOSITORY, first: ${MAX_COUNT},after:"${params.endCursor}"`;
  }
  return sqlString;
};

const setLocalHistoryStorage = (value) => {
  const preData = getLocalHistoryStorage();
  if (isExitHistory(value, preData)) return;
  const nextData = [value, ...preData];
  if (window.localStorage) {
    localStorage.setItem(SEARCH_REPO_HISTORY, JSON.stringify(nextData));
  }
};

const getLocalHistoryStorage = () => {
  let data = [];
  if (window.localStorage) {
    data = localStorage.getItem(SEARCH_REPO_HISTORY);
    data = data ? JSON.parse(data) : [];
  }
  return data;
};

const clearLocalHistoryStorage = () => {
  if (window.localStorage) {
    localStorage.clear();
  }
};

export {
  isExitHistory,
  getQueryString,
  getLocalHistoryStorage,
  setLocalHistoryStorage,
  clearLocalHistoryStorage,
};
