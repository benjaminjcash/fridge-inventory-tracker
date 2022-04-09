const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { createProduce, searchProduce } = require("../controllers/produce.controller");

const produceRoutes = express.Router();

produceRoutes
    .post("/", validateToken, createProduce)
    .get("/:name", validateToken, searchProduce)

module.exports = produceRoutes;