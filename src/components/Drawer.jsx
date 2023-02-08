import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const Drawer = () => {
  const matches = useMediaQuery("(min-width: 450px)");

  const content =
    "Drawer Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, eos velit! Pariatur explicabo nesciunt minus corporis cum reiciendis illo,   voluptatem maxime magnam rem ea sapiente ex vel in tempora expedita!";

  return matches ? (
    <div className="drawer">{content}</div>
  ) : (
    <div className="drawer drawer--xs">{content}</div>
  );
};

export default Drawer;
