import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import * as serviceWorker from "./serviceWorker";
import GithubState from "./context/githubState";
ReactDOM.render(
  <React.StrictMode>
    <GithubState>
      <Home />
    </GithubState>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
