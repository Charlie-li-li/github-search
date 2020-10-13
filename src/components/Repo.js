import React, { useContext } from "react";
import { get } from "lodash";
import RepoItem from "./RepoItem";
import GithubContext from "../context/githubContext";

export default () => {
  const githubContext = useContext(GithubContext);
  const repoResult = get(githubContext, "repoList") || [];
  return (
    <ul className="pullup-list">
      {repoResult.map((item, index) => (
        <RepoItem key={index} item={item} />
      ))}
    </ul>
  );
};
