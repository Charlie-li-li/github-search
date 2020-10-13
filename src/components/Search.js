import React, { useRef, useContext } from "react";
import CloseIcon from "./CloseIcon";
import GithubContext from "../context/githubContext";

const Search = () => {
  const timerRef = useRef(null);
  const inputEl = useRef(null);
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
        className="search_input"
        ref={inputEl}
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      {searchValue && <CloseIcon onClose={resetInputField} />}
    </div>
  );
};

export default Search;
