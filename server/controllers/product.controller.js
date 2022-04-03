const axios = require("axios");
const logger = require("../utils/logger");
const { doCreateProduct, doSearchProduct, doFetchAllProducts, doUpdateProduct } = require("../data/product.dal");
let UPC_API_KEY;
if(process.env.NODE_ENV === 'development') {
  UPC_API_KEY = require("../utils/api-key");
} else {
  UPC_API_KEY = process.env.UPC_API_KEY;
}

exports.lookupUPC = async (req, res) => {
  try {
    const barcode = req.params.barcode;
    logger.info(`lookup UPC with barcode: ${barcode}`);
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

exports.searchUPC = async (req, res) => {
  try {
    const query = req.body;
    logger.info(`search UPC with query: ${JSON.stringify(query)}`);
    const endpoint = `https://api.upcitemdb.com/prod/v1/search`;
    const searchBody = _buildSearchBody(query);
    axios.post(endpoint, searchBody, {
      headers: {
        user_key: UPC_API_KEY
      }
    })
    .then(resp => {
      logger.info(`found ${resp.data.total} item(s)`);
      res.send(resp.data);
    })
    .catch(resp => {
      const error = resp.response.data;
      res.send({
        success: false,
        error: error
      });
    });
  }
  catch(err) {
    res.send({
      success: false,
      error: err
    });
  }
}

const _buildSearchBody = (query) => {
  let body = { s: query.name };
  if(query.type) body.type = query.type;
  if(query.offset) body.offset = query.offset;
  if(query.match_mode) body.match_mode = query.match_mode;
  if(query.filter) body.filter = query.filter;
  return body;
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

exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await doFetchAllProducts(req);
    if(products.length == 0) {
      return res.json({
          success: false,
          error: "no records found"
      });
    } else {
      res.json({
          success: true,
          data: products
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

exports.updateProduct = async (req, res) => {
  try {
      const product = await doUpdateProduct(req.params.productId, req.body);
      if(product == null) {
          return res.json({
              success: false,
              error: "no record found"
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