
const express = require('express')
const router = express.Router();
const articlesController = require("../controllers/articlesController");


router.get("/articles", articlesController.findAll);

router.post("/article", articlesController.create);

// router.delete("/article/:id", articlesController.delete)