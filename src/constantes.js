const MAX_COUNT = 20;

const NO_DATA = "暂无搜索数据";

const LOADINF_TEXT = "loading...";

const HISTORY_TEXT = "History";

const URL = "https://api.github.com/graphql";

const SEARCH_TEXT = "Please input search in github";

const TOKEN =
  process.env.APP_GITHUB_CLIENT_SECRET ||
  "0c115210c2996747e340471a4b5b29e4638c1ab7";


export {
  URL,
  TOKEN,
  NO_DATA,
  MAX_COUNT,
  SEARCH_TEXT,
  HISTORY_TEXT,
  LOADINF_TEXT,
};
