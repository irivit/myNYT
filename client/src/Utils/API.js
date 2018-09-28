// import axios from "axios";
const API_KEY = process.env.NYT_KEY;
const axios = require("axios");

export default {

    //Called from App.js when user clicks to search for article
    getArticles: (userQuery) => {    
        const { topic, startYear, endYear } = userQuery;
        return (axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=607fd5324c824030b89c98a3687e37c8&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}0101&fq=document_type:(article)`));
    
    },

    //Called from App.js when user click save article
    saveArticle: (data) => {
    
        const articleData = {
            headline: data.headline.main,
            url: data.web_url,
            date: data.date
        };
        return (axios.post("/api/article", articleData));
    },

  
    getSavedArticles: () => {
        return (axios.get("/api/articles"));

    },
 
    deleteArticle: (data) => {
        return (axios.delete(`api/article/${data._id}`));
    }
}