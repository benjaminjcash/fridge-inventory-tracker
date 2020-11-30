const express = require("express");
const { createCommonItem, searchCommonItems } = require("../controllers/commonItem.controller");
const validateToken = require('../middleware/auth.middleware');

const commonItemRoutes = express.Router();

commonItemRoutes
    .post("/", createCommonItem)
    .get("/", validateToken, searchCommonItems);

module.exports = commonItemRoutes;