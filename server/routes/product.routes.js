const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { search, createProduct } = require("../controllers/product.controller");

const productRoutes = express.Router();

productRoutes
    .get("/:barcode", validateToken, search)
    .post("/", validateToken, createProduct)

module.exports = productRoutes;