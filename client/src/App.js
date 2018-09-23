import React, { Component } from "react";
// import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
// import character from "./characters.json";
import Nav from "./components/Nav/Nav";
import Jumbotron from "./components/Jumbotron/Jumbotron";
// import Container from "./Container";
// import Row from "./Row";
// import Column from "./Column";
import "./App.css";


class App extends Component {

// //Setting the state
//   state = {
//     character,
//     actualScore: 0,
//     topScore: 0,
//     clicked: []
//   };


  render() {
    return (
      <Wrapper>
        <Nav
        />
        <Jumbotron />
      </Wrapper>
    );
  }
};

export default App;