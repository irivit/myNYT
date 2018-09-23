import React from "react";
import "./Card.css";

const ResultsCard = props => (

<div className="card" value={props.id}>

    <div className="container">
      <h3>{props.title} </h3>
      <img alt={props.name} src={props.image}/>
    </div>
</div>
);


export default ResultsCard;
