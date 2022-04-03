const express = require("express");
const { createItem, getAllItems, getItem, updateItem, deleteItems } = require("../controllers/item.controller");
const validateToken = require('../middleware/auth.middleware');

const itemRoutes = express.Router();

itemRoutes
    .post("/", validateToken, createItem)
    .get("/", validateToken, getAllItems)
    .get("/:itemId", validateToken, getItem)
    .put("/:itemId", validateToken, updateItem)
    .post("/delete", validateToken, deleteItems);

module.exports = itemRoutes;