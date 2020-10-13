import React, { useContext } from "react";
import GithubContext from "../context/githubContext";

export default ({ item }) => {
  const githubContext = useContext(GithubContext);
  const { searchGithub, setSearchValue } = githubContext;

  const searchHistory = (item) => {
    setSearchValue(item);
    searchGithub({ searchValue: item });
  };

  return (
    <span onClick={() => searchHistory(item)} className="item">
      {item}
    </span>
  );
};
