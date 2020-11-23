import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  Fragment,
} from "react";
import { get } from "lodash";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import Repo from "./Repo";
import History from "./History";
import { LOADINF_TEXT, NO_DATA } from "../constantes";
import GithubContext from "../context/githubContext";
BScroll.use(Pullup);

export default () => {
  const bscrollRef = useRef(null);
  let bscroll = useRef(null);
  const [isPullUpLoad, setISPullUpLoad] = useState(false);
  const githubContext = useContext(GithubContext);
  const {
    loading,
    showHistory,
    searchGithub,
    searchValue,
    historySearch,
    clearSearchHistory,
  } = githubContext;
  const endCursor = get(githubContext.repoResult, "search.pageInfo.endCursor");
  const startCursor = get(
    githubContext.repoResult,
    "search.pageInfo.startCursor"
  );
  const hasNextPage = get(
    githubContext.repoResult,
    "search.pageInfo.hasNextPage"
  );

  useEffect(() => {
    if (bscrollRef.current) {
      bscroll.current = new BScroll(bscrollRef.current, {
        pullUpLoad: true,
      });
      bscroll.current.on("pullingUp", pullingUpHandler);
    }
  });

  const pullingUpHandler = async () => {
    setISPullUpLoad(true);
    await searchGithub({ hasNextPage, searchValue, endCursor });
    bscroll.current.finishPullUp();
    bscroll.current.refresh();
    setISPullUpLoad(false);
  };

  const renderHistory = () => {
    return showHistory && historySearch.length > 0 ? (
      <History
        historySearch={historySearch}
        clearSearchHistory={clearSearchHistory}
      />
    ) : null;
  };

  const renderSearchRepo = () => {
    const isNoData =
      !startCursor && !endCursor && searchValue && !loading && !showHistory;
    return isNoData ? (
      <div className="no_data">{NO_DATA}</div>
    ) : (
      !showHistory && (
        <div className="pullup">
          <div ref={bscrollRef} className="pullup-wrapper">
            <div className="pullup-content">
              <Repo />
              {isPullUpLoad && (
                <div className="pullup-tips">
                  <div className="after-trigger">
                    <span className="pullup-txt">{LOADINF_TEXT}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <Fragment>
      {renderHistory()}
      {renderSearchRepo()}
    </Fragment>
  );
};
