import React from "react";

const Header = (props) => {
    const classes = "text-7xl text-blue-500 font-bold w-full text-center focus:outline-none focus:shadow-outline " + props.className;
    return <div id={props.id} className={classes}>{props.children}</div>;
}

export default Header;