import React, { useMemo, useState } from "react";
import Dragger from "../Dragger/Dragger";
import { indexToNumber } from "../helpers/helpers";

const NumbersDragger = () => {
  const [slides, setSlides] = useState([0, 1, 2, 3, 4]);

  function addSlide() {
    setSlides(function pushNewSlide(prev) {
      console.log({ prev });
      return [...prev, prev[prev.length - 1] + 1];
    });
  }

  return (
    <>
      <h2>Numbers Dragger</h2>
      <p>Current Slides: {slides.map(indexToNumber).join(",")}</p>
      <button onClick={addSlide}>Add Slide</button>
      <Dragger slides={slides} />
    </>
  );
};

export default NumbersDragger;
