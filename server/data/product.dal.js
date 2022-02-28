const Product = require("../models/product.model");
const logger = require("../utils/logger");

exports.doCreateProduct = async (req) => {
  const newProduct = new Product({
    name: req.body.name,
    type: req.body.type,
    image_url: req.body.image_url,
    shelf_life : req.body.shelf_life,
    upc_data: req.body.upc_data,
    upc_code: req.body.upc_code
  });
  return newProduct.save()
    .then((data) => {
      return data;
    }).catch(err => {
      logger.error(err);
      throw err;
    });
}

exports.doSearchProduct = async (req) => {
  const { barcode } = req.params;
  let query = {
    upc_code: barcode
  };
  return Product
      .find(query)
      .then((data) => {
        return data;
      }).catch((err) => {
        throw err;
      });
}

exports.doFetchAllProducts = async (req) => {
  return Product
      .find()
      .then((data) => {
        return data;
      }).catch((err) => {
        throw err;
      });
}