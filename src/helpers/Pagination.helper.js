import React from "react";
import { Icon } from "antd";

const ItemsRender = (current, type, originalElement) => {
  if (type === "prev") {
    return (
      <Icon
        type="left-circle"
        alt="Previous page"
        style={{ fontSize: "20px", position: "relative", top: "3px" }}
      />
    );
  }
  if (type === "next") {
    return (
      <Icon
        type="right-circle"
        alt="Next page"
        style={{ fontSize: "20px", position: "relative", top: "3px" }}
      />
    );
  }
  return originalElement;
};

export default ItemsRender;
