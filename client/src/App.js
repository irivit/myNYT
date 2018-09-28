import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom"
import Wrapper from "./components/Wrapper";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Panel from "./components/Panel";
import Search from "./components/SearchCard";
import List from "./components/List";
import Items from "./components/Items";
import ListContainer from "./components/ListContainer";
import Buttons from "./components/Buttons";
import API from "./Utils/API";
import Messages from "./components/Messages";
import Body from "./components/Body";
import "./App.css";


class App extends Component {
  state = {
    topic: "technology",
    startYear: 1988,
    endYear: 2018,
    results: [],
    error: "",
    savedArticles: []
  };

  //When page loads, makes a request to get any articles saved in database.
  componentDidMount() {
    this.getSaved();
  };

  getSaved = () => {
    console.log("getSaved method")
    API.getSavedArticles().then(response => {
      this.setState({
        savedArticles: response.data
      });
    })
  };

  //Called when user updates any of 3 form inputs
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };


  //Called when user clicks submit button in form
  handleFormSubmit = event => {
    event.preventDefault();
    document.querySelector("form").reset();

    API.getArticles(this.state).then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      };
      this.setState({ results: res.data.response.docs.slice(0, 5), error: "" });
    }).catch(err => this.setState({ error: err.message }))
  };

  //Opens article in new window
  viewArticle = event => {
    window.open(event.target.value);
  };

  //Called when user clicks Save button
  handleArticleSave = event => {
    event.preventDefault();
    const clickedArticle = (this.state.results.filter(element => element._id === event.target.id)[0]);
    API.saveArticle(clickedArticle).then(res => {
      this.getSaved();
    })
  };

  //Called when user clicks Delete button
  handleArticleDelete = (event) => {
    event.preventDefault();
    const clickedArticle = this.state.savedArticles.filter(element => element._id = event.target.id)[0];
    API.deleteArticle(clickedArticle).then(response => {
      this.getSaved();
    })
  };


  render() {
    return (
      <Wrapper>
        <Jumbotron>
          <h1 className="jumbotron-header">New York Times Article Scrubber</h1>
          <h3>Search for NYT articles of your preference</h3>
        </Jumbotron>
        <Body>
          <Panel heading="Search">
            < Search
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Panel>
          <Panel heading="Results">
            <div
              ref={(el) => { this.resultsTop = el; }}>
            </div>
            {this.state.results.length ? (
              <List>
                {this.state.results.map(result => (
                  <Items key={result._id}>
                    <ListContainer
                      headline={result.headline.main}
                      pub_date={result.pub_date}
                      url={result.web_url} />
                    <Buttons className="btn viewArticle" value={result.web_url} onClick={this.viewArticle}>
                      View Article </ Buttons>
                    <Buttons id={result._id} className="btn saveBtn" onClick={this.handleArticleSave}>
                      Save Article</ Buttons>
                  </Items>
                ))}
              </List>
            ) : (<Messages message="Search for an Article Above and View Results Here" />)}

          </Panel>
          <Panel heading="Saved Articles">
            <div
              ref={(el) => { this.savedTop = el; }}>
            </div>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.slice(0).reverse().map(article => (
                  <Items key={article._id}>
                    <ListContainer headline={article.headline} pub_date={article.date} url={article.url} />

                    <Buttons className="btn viewArticle" value={article.web_url} onClick={this.viewArticle}>
                      View Article
                    </ Buttons>
                    <Buttons id={article._id} className="btn deleteBtn" onClick={this.handleArticleDelete}>
                      Delete Article
                   </ Buttons>
                  </Items>
                ))}
              </List>
            ) : <Messages message="Save an article from the search results above and view the list of saved articles here." />}
          </Panel>

        </Body>

      </Wrapper>
    );
  }
};

export default App;