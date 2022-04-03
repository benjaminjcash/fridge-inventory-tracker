const express = require("express");
const validateToken = require('../middleware/auth.middleware');
const { lookupUPC, searchUPC, createProduct, searchProduct, fetchAllProducts, updateProduct } = require("../controllers/product.controller");

const productRoutes = express.Router();

productRoutes
    .get("/upc/:barcode", validateToken, lookupUPC)
    .post("/upc/search", validateToken, searchUPC)
    .get("/:barcode", validateToken, searchProduct)
    .get("/", validateToken, fetchAllProducts)
    .post("/", validateToken, createProduct)
    .put('/:productId', validateToken, updateProduct);

module.exports = productRoutes;