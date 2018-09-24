import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav/Nav";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Panel from "./components/Panel";
import Search from "./components/SearchCard";
import List from "./components/List";
import Items from "./components/Items";
import ListContainer from "./components/ListContainer";
import Buttons from "./components/Buttons";
import API from "./Utils/API";
import Messages from "./components/Messages";
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
      console.log("response to getSavedArticles: ", response);
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
    //Call method on API that will pass in state as parameter to be used to interact with NYT API

    API.getArticles(this.state).then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      };
      this.resultsTop.scrollIntoView({ behavior: "smooth", block: "start" }); //Scolls down to the resultsTop reference inthe results panel

      this.setState({ results: res.data.response.docs.slice(0, 5), error: "" }); //Saves first 5 search results into state as an array of objects
    }).catch(err => this.setState({ error: err.message }))
  };

  //Opens article in new window
  viewArticle = event => {
    console.log(event.target.value);
    window.open(
      event.target.value,
      '_blank' //
    );
  };

  //Called when user clicks Save button
  handleArticleSave = event => {
    event.preventDefault();
    const clickedArticle = (this.state.results.filter(element => element._id === event.target.id)[0]);//Locates the article from the results array with the ID matching the button clicked

    API.saveArticle(clickedArticle).then(res => {
      this.getSaved();
      this.savedTop.scrollIntoView({ behavior: "smooth", block: "center" }); //Scolls down to the savedTop reference in the Saved panel

    })
  };

  //Called when user clicks Delete button
  handleArticleDelete = (event) => {
    event.preventDefault();
    const clickedArticle = this.state.savedArticles.filter(element => element._id = event.target.id)[0]; //Locates the article from the savedArticle array with the ID matching the button clicked
    API.deleteArticle(clickedArticle).then(response => {
      this.getSaved();
    })
  };


  render() {
    return (
      <Wrapper>
        {/* <Nav
        /> */}
        <Jumbotron>
          <h1 className="jumbotron-header">New York Times Article Scrubber</h1>
          <h3>Search for NYT articles using a keyword and save any article to review later</h3>
        </Jumbotron>
        <Panel heading="Search">
          < Search
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Panel>
        <Panel heading="Results">
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.resultsTop = el; }}>
          </div>
          {this.state.results.length ? (
            <List>
              {this.state.results.map(result => ( //For each article in the result array, create a list item with a div w/ article info, and a save button with article ID
                <Items key={result._id}>
                  <ListContainer
                    headline={result.headline.main}
                    pub_date={result.pub_date}
                    url={result.web_url} />
              
                    <Buttons className="btn viewArticle" value={result.web_url} onClick={this.viewArticle}>
                      View Article
                                            </ Buttons>
                    <Buttons id={result._id} className="btn saveBtn" onClick={this.handleArticleSave}>
                      Save Article
                                            </ Buttons>

            
                </Items>
              ))}
            </List>
          ) : (<Messages message="Search for an Article Above and View Results Here" />)}

        </Panel>
        <Panel heading="Saved Articles">
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.savedTop = el; }}>
          </div>
          {this.state.savedArticles.length ? (
            <List>
              {this.state.savedArticles.slice(0).reverse().map(article => ( //For each article in the savedArticles array, create a list item (reverse order) with a div w/ article info, and a delete button with article ID
                <Items key={article._id}>
                 <ListContainer headline={article.headline}  pub_date={article.pub_date}  url={article.url} />

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
        
      </Wrapper>
    );
  }
};

export default App;