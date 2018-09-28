import React from "react";
import "./Items.css";

const Items = props => (
  <li className="list-group-item">

    {props.children}
 
  </li>
);

export default Items;