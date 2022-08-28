import React from "react";

const Form = (props) => {
  const classes = "flex flex-col min-h-fit w-2/3 mx-3 my-5 rounded-lg shadow-xl " + props.className;
  return <form onSubmit={props.onFormSubmit} className={classes}>{props.children}</form>;
}

export default Form;
