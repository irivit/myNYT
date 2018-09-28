const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//  API routes
const routes = require("./routes")
app.use(routes);




if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// MongoDB Mongoose connection
const mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost/nytreact';
mongoose.connect(mongoDBURI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, Mongoose connected to MongoDB`));
  })
.catch(err => console.log(err));