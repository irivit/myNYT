
import React from "react";
import "./Jumbotron.css";

const Jumbotron = ( {children} ) => (
  <div className="jumbotron">
  <div className= "container">
    {children}
  </div>
  </div>
);

export default Jumbotron;
