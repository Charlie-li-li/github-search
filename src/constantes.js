const MAX_COUNT = 20;

const NO_DATA = "暂无搜索数据";

const LOADINF_TEXT = "loading...";

const HISTORY_TEXT = "History";

const URL = "https://api.github.com/graphql";

const TOKEN =
  process.env.APP_GITHUB_CLIENT_SECRET ||
  "c873c6e3f94e229d777aa61ca3f16274dbdc5a73";

export { URL, TOKEN, NO_DATA, MAX_COUNT, HISTORY_TEXT, LOADINF_TEXT };
