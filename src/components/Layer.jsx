import React from "react";
import "./layer.css";
import Drawer from "./Drawer";

const Layer = () => {
  return (
    <div className="layer">
      <Drawer />
      <div className="endSubLayer">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Layer;
