import React from "react";
import ClearIcon from "./ClearIcon";
import HistoryItem from "./HistoryItem";
import { HISTORY_TEXT } from "../constantes";

export default (props) => {
  const { historySearch, clearSearchHistory } = props;
  return (
    <div className="history">
      <div className="title">
        <span className="title_word">{HISTORY_TEXT}</span>
        <div onClick={clearSearchHistory}>
          <ClearIcon />
        </div>
      </div>
      {historySearch.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </div>
  );
};
