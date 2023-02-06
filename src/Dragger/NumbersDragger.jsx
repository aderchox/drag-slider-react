import React, { useEffect, useRef } from "react";
import DragItem from "./DragItem";
import anime from "animejs/lib/anime.es.js";

const NumbersDragger = () => {
  const isDraggingRef = useRef(false);
  const startXRef = useRef(null);
  const startScrollLeftRef = useRef(null);
  const sliderRef = useRef(null);
  const INITIAL_ACTIVE_SLIDE_INDEX = 2;
  const activeSlideIndexRef = useRef(INITIAL_ACTIVE_SLIDE_INDEX);
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
    walkDirection.current = e.movementX > 0 ? "left" : "right";
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
    const EASING = "cubicBezier(.3, .7, .1, 1.1)";
    const DURATION = 400;
    const TARGET = sliderRef.current;
    if (walkDirection.current === "right") {
      if (widthInRatio < 0.15) {
        anime({
          targets: TARGET,
          scrollLeft: TARGET.scrollLeft - widthIn,
          easing: EASING,
          duration: DURATION,
        });
      } else {
        anime({
          targets: TARGET,
          scrollLeft: TARGET.scrollLeft - widthIn + fullWidth,
          easing: EASING,
          duration: DURATION,
        });
        activeSlideIndexRef.current++;
      }
    } else {
      if (widthInRatio < 0.85) {
        anime({
          targets: TARGET,
          scrollLeft: TARGET.scrollLeft - widthIn,
          easing: EASING,
          duration: DURATION,
        });
        activeSlideIndexRef.current--;
      } else {
        anime({
          targets: TARGET,
          scrollLeft: TARGET.scrollLeft - widthIn + fullWidth,
          easing: EASING,
          duration: DURATION,
        });
      }
    }
  }

  function activateSlide(slideNumber) {
    const bodyWidth = parseInt(getComputedStyle(document.body).width, 10);
    sliderRef.current.scrollLeft = slideNumber * bodyWidth;
  }

  function windowResizeHandler() {
    activateSlide(activeSlideIndexRef.current);
  }

  function initialize() {
    activateSlide(activeSlideIndexRef.current);
  }

  useEffect(() => {
    initialize();
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
