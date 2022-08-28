import React from "react";

const Card = (props) => {
  const classes = "px-3 py-5 rounded-lg shadow-xl " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
