import React, { useRef, useContext } from "react";
import CloseIcon from "./CloseIcon";
import GithubContext from "../context/githubContext";
import { SEARCH_TEXT } from '../constantes';

const Search = () => {
  const timerRef = useRef(null);
  
  const githubContext = useContext(GithubContext);
  const {
    clearRepo,
    searchValue,
    searchGithub,
    setShowHistory,
    setSearchValue,
  } = githubContext;

  const handleSearchInputChanges = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      clearTimeout(timerRef.current);
    }
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        searchGithub({ searchValue: value });
      }, 800);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        searchGithub({ searchValue: value });
      }, 800);
    }
  };

  const resetInputField = () => {
    setSearchValue("");
    clearRepo();
    setShowHistory(true);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        className="search_input"
        onChange={handleSearchInputChanges}
        placeholder={SEARCH_TEXT}
      />
      {searchValue && <CloseIcon onClose={resetInputField} />}
    </div>
  );
};

export default Search;
