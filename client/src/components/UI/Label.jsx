import React from "react";

const Label = (props) => {
    return (
        <label className={`block text-xl font-medium text-white ${props.className}`}>
            {props.children}
        </label>
    );
}

export default Label;