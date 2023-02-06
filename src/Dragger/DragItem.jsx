import React from "react";
import { indexToNumber } from "../helpers/helpers";

const DragItem = ({ index }) => {
  return <div className="dragItem">Slide #{indexToNumber(index)}</div>;
};

export default DragItem;
