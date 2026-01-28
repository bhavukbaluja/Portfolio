// BaseGridLayout.js
import React from "react";
import "./Base.scss";
import clsx from "clsx";

const BaseGridLayout = ({ items = [], renderItem, maxCols = 3, mobileCols = 1 }) => {
  const gridClass = `base-grid-${maxCols}-${mobileCols}`;
  return (
    <div className={clsx("base-grid-layout", gridClass)}>
      {items.map((item, index) => (
        <div key={item.id || index} className="base-grid-tile">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default BaseGridLayout;
