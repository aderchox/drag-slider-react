import React, { useEffect, useRef } from "react";
import DragItem from "./DragItem";

const NumbersDragger = () => {
  const isDraggingRef = useRef(false);
  const startXRef = useRef(null);
  const startScrollLeftRef = useRef(null);
  const sliderRef = useRef(null);
  const activeSlideNumberRef = useRef(0);
  const walkDirection = useRef(null);

  function dragStartHandler(e) {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    startScrollLeftRef.current = sliderRef.current.scrollLeft;
    document.body.classList.add("slider-active");
  }

  function dragMoveHandler(e) {
    if (!isDraggingRef.current) {
      return;
    }
    const walk = e.pageX - startXRef.current;
    sliderRef.current.scrollLeft = startScrollLeftRef.current - walk;
    walkDirection.current = walk > 0 ? "left" : "right";
  }

  function endDrag(e) {
    isDraggingRef.current = false;
    document.body.classList.remove("slider-active");
    const fullWidth = parseInt(getComputedStyle(document.body).width, 10);
    const widthIn = sliderRef.current.scrollLeft % fullWidth;
    const widthInRatio = widthIn / fullWidth;
    if (widthInRatio === 0) {
      return;
    }
    if (walkDirection.current === "right") {
      if (widthInRatio < 0.15) {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - widthIn;
      } else {
        sliderRef.current.scrollLeft =
          sliderRef.current.scrollLeft - widthIn + fullWidth;
        activeSlideNumberRef.current++;
      }
    } else {
      if (widthInRatio < 0.85) {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - widthIn;
        activeSlideNumberRef.current--;
      } else {
        sliderRef.current.scrollLeft =
          sliderRef.current.scrollLeft - widthIn + fullWidth;
      }
    }
  }

  function windowResizeHandler() {
    const bodyWidth = parseInt(getComputedStyle(document.body).width, 10);
    sliderRef.current.scrollLeft = activeSlideNumberRef.current * bodyWidth;
  }

  useEffect(() => {
    window.addEventListener("mousemove", dragMoveHandler);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("mousemove", dragMoveHandler);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  return (
    <div className="dragger" onMouseDown={dragStartHandler} ref={sliderRef}>
      <DragItem>1</DragItem>
      <DragItem>2</DragItem>
      <DragItem>3</DragItem>
      <DragItem>4</DragItem>
      <DragItem>5</DragItem>
    </div>
  );
};

export default NumbersDragger;
