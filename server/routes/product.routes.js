const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { searchUPC, createProduct } = require("../controllers/product.controller");

const productRoutes = express.Router();

productRoutes
    .get("/upc/:barcode", validateToken, searchUPC)
    .post("/", validateToken, createProduct)

module.exports = productRoutes;