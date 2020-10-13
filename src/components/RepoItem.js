import React from "react";

export default ({ item }) => {
  return (
    <li className="pullup-list-item item">
      <a href={item.node.url}>{item.node.name}</a>
      <span>({item.node.description})</span>
    </li>
  );
};
