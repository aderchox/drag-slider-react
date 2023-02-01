import React from "react";
import DragItem from "./DragItem";
import { useState } from "react";

const NumbersDragger = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState();
  const [startScrollLeft, setStartScrollLeft] = useState();

  function dragStartHandler(e) {
    setIsDragging(true);
    setStartX(e.pageX - e.target.offsetLeft);
    setStartScrollLeft(e.target.scrollLeft);
  }

  function dragMoveHandler(e) {
    if (!isDragging) {
      return;
    }
    const walk = e.pageX - startX;
    e.target.scrollLeft = startScrollLeft - walk;
  }

  function endDrag(e) {
    setIsDragging(false);
  }

  return (
    <div
      className="dragger"
      onMouseDown={dragStartHandler}
      onMouseMove={dragMoveHandler}
      onMouseUp={endDrag}
    >
      <DragItem>1</DragItem>
      <DragItem>2</DragItem>
      <DragItem>3</DragItem>
    </div>
  );
};

export default NumbersDragger;
