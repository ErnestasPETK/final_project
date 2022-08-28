import React from "react";

const Submit = (props) => {
    const classes = "bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/3 my-6 py-2 px-4 focus:outline-none focus:shadow-outline rounded-lg shadow-xl " + props.className;
    return <input type="submit" placeholder={props.placeholder} className={classes}></input>;
}

export default Submit;