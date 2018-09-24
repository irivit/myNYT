
import React from "react";
import "./Messages.css";

const MessageDiv = props => {
   return (   <div className="no-articles-message">
            {props.message}
        </div>
    )
};

export default MessageDiv 