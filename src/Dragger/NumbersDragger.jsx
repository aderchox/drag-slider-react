import React, { useEffect, useRef } from "react";
import DragItem from "./DragItem";

const NumbersDragger = () => {
  const isDraggingRef = useRef(false);
  const startXRef = useRef(null);
  const startScrollLeftRef = useRef(null);
  const sliderRef = useRef(null);

  function dragStartHandler(e) {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    startScrollLeftRef.current = sliderRef.current.scrollLeft;
  }

  function dragMoveHandler(e) {
    if (!isDraggingRef.current) {
      return;
    }
    const walk = e.pageX - startXRef.current;
    sliderRef.current.scrollLeft = startScrollLeftRef.current - walk;
  }

  function endDrag(e) {
    isDraggingRef.current = false;
  }

  useEffect(() => {
    window.addEventListener("mousemove", dragMoveHandler);
    window.addEventListener("mouseup", endDrag);

    return () => {
      window.removeEventListener("mousemove", dragMoveHandler);
      window.removeEventListener("mouseup", endDrag);
    };
  }, []);

  return (
    <div className="dragger" onMouseDown={dragStartHandler} ref={sliderRef}>
      <DragItem>1</DragItem>
      <DragItem>2</DragItem>
      <DragItem>3</DragItem>
    </div>
  );
};

export default NumbersDragger;
