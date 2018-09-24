import React from "react";
import "./Items.css";

const ListItem = props => (
  <li className="list-group-item">
  <div className="listParentDiv">
    {props.children}
    </div>
  </li>
);

export default ListItem;