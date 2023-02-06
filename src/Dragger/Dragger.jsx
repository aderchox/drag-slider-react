import React, { useEffect, useRef } from "react";
import DragItem from "./DragItem";
import anime from "animejs/lib/anime.es.js";

const Dragger = ({ slides }) => {
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
    const { fullWidth, widthIn, widthInRatio } = getSlidePlaceInformation();
    if (widthInRatio === 0) {
      return;
    }
    animateDragEnd(fullWidth, widthIn, widthInRatio);
  }

  function getSlidePlaceInformation() {
    const fullWidth = parseInt(getComputedStyle(document.body).width, 10);
    const widthIn = sliderRef.current.scrollLeft % fullWidth;
    const widthInRatio = widthIn / fullWidth;
    return {
      fullWidth,
      widthIn,
      widthInRatio,
    };
  }

  function animateDragEnd(fullWidth, widthIn, widthInRatio) {
    const EASING = "cubicBezier(.3, .7, .1, 1.1)";
    const DURATION = 400;
    const TARGET = sliderRef.current;
    const sharedAnimeOptions = {
      targets: TARGET,
      easing: EASING,
      duration: DURATION,
    };
    const CHANGE_SLIDE_THRESHOLD = 0.15;

    if (walkDirection.current === "right") {
      if (widthInRatio < CHANGE_SLIDE_THRESHOLD) {
        anime({
          ...sharedAnimeOptions,
          scrollLeft: TARGET.scrollLeft - widthIn,
        });
      } else {
        anime({
          ...sharedAnimeOptions,
          scrollLeft: TARGET.scrollLeft - widthIn + fullWidth,
        });
        activeSlideIndexRef.current++;
      }
    } else {
      if (widthInRatio < 1 - CHANGE_SLIDE_THRESHOLD) {
        anime({
          ...sharedAnimeOptions,
          scrollLeft: TARGET.scrollLeft - widthIn,
        });
        activeSlideIndexRef.current--;
      } else {
        anime({
          ...sharedAnimeOptions,
          scrollLeft: TARGET.scrollLeft - widthIn + fullWidth,
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
      {slides.map(function generateDragItem(s, i) {
        return <DragItem index={s} key={i} />;
      })}
    </div>
  );
};

export default Dragger;
