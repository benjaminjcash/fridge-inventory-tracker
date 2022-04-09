const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { createProduce, searchProduce,fetchAllProduces, updateProduce, deleteProduce } = require("../controllers/produce.controller");

const produceRoutes = express.Router();

produceRoutes
    .post("/", validateToken, createProduce)
    .get("/:name", validateToken, searchProduce)
    .get("/", validateToken, fetchAllProduces)
    .put('/:produceId', validateToken, updateProduce)
    .delete("/:produceId", validateToken, deleteProduce);

module.exports = produceRoutes;