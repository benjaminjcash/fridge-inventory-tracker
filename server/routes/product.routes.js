const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { searchUPC, createProduct, searchProduct, fetchAllProducts } = require("../controllers/product.controller");

const productRoutes = express.Router();

productRoutes
    .get("/upc/:barcode", validateToken, searchUPC)
    .get("/:barcode", validateToken, searchProduct)
    .get("/", validateToken, fetchAllProducts)
    .post("/", validateToken, createProduct)

module.exports = productRoutes;