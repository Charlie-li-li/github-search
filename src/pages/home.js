import React, { Fragment, useContext } from "react";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import GithubContext from "../context/githubContext";
import { LOADINF_TEXT } from "../constantes";
import "../scss/home.scss";

const App = () => {
  const githubContext = useContext(GithubContext);
  const { loading, errorMessage } = githubContext;
  const renderError = () => <div className="error">{errorMessage?.message}</div>;
  const renderLoading = () =>
    loading && <div className="loading">{LOADINF_TEXT}</div>;
  return (
    <div className="App">
      <div className="wrap">
        <div className="head_box">
          <Search />
        </div>
        {errorMessage ? (
          renderError()
        ) : (
          <Fragment>
            <SearchResult />
            {renderLoading()}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
