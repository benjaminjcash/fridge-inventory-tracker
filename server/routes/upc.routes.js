const express = require("express");
const { search } = require("../controllers/upc.controller");
const validateToken = require('../middleware/auth.middleware');

const upcRoutes = express.Router();

upcRoutes
    .get("/:barcode", validateToken, search)

module.exports = upcRoutes;