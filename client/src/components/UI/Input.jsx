import React from "react";

const Input = (props) => {
    const classes = "text-gray-700 flex my-2 h-5 w-full px-3 py-5 rounded-lg shadow-xl " + props.className;
    return <input name={props.name} defaultValue={props.defaultValue} pattern={props.pattern} min={props.min} type={props.type} placeholder={props.placeholder} className={classes}>{props.children}</input>;
}

export default Input;
