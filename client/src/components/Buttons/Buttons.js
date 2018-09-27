import React from "react";
import "./Buttons.css";

const Buttons = (props) => {
    return (
        <div className="button-group-div" role="group">
            <button type="button" {...props}>
                {props.children}
            </button>
        </div>
    )
};

export default Buttons;