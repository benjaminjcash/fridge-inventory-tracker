const axios = require("axios");
const logger = require("../utils/logger");
const { doCreateProduct, doSearchProduct } = require("../data/product.dal");
const localKey = require("../utils/api-key");
const UPC_API_KEY = process.env.UPC_API_KEY || localKey;

exports.searchUPC = async (req, res) => {
  try {
    const barcode = req.params.barcode;
    logger.info(`searching UPC with barcode: ${barcode}`);
    const endpoint = `https://api.upcitemdb.com/prod/v1/lookup?upc=${barcode}`;
    axios.get(endpoint, {
      headers: {
        user_key: UPC_API_KEY
      }
    })
    .then(resp => {
      logger.info(`found ${resp.data.total} item(s)`);
      res.send(resp.data);
    })
    .catch(error => {
      logger.error(error);
    });
  }
  catch(err) {
    res.send({
      success: false,
      error: err
    });
  }
}

exports.searchProduct = async (req, res) => {
  try {
    const product = await doSearchProduct(req);
    if(!product.length > 0) {
      return res.json({
        success: false,
        error: "product not found"
      });
    } else {
      res.json({
        success: true,
        data: product
      });
    }
  }
  catch(err) {
    logger.error(err);
    res.send({
      success: false,
      error: err
    });
  }
}

exports.createProduct = async (req, res) => {
  try {
    const product = await doCreateProduct(req);
    if(!product) {
      return res.json({
        success: false,
        error: "product not created"
      });
    } else {
      res.json({
        success: true,
        data: product
      });
    }
  }
  catch(err) {
    logger.error(err);
    res.send({
      success: false,
      error: err
    });
  }
}