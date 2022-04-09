const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { createProduce } = require("../controllers/produce.controller");

const produceRoutes = express.Router();

produceRoutes
    .post("/", validateToken, createProduce);

module.exports = produceRoutes;