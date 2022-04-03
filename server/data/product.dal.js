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

exports.doUpdateProduct = async (id, body) => {
  return Product
    .findOneAndUpdate({ _id: id }, body)
    .then((data) => {
      return data;
    }).catch((err) => {
      throw err;
    });
}

exports.doDeleteProduct = async (res, id) => {
  console.log(JSON.stringify(id));
  Product.findByIdAndDelete(id)
  .then(() => {
      res.json({
          success: true,
          message: "deleted successfully"
      });
  }).catch(err => {
      res.send(err);
  });
}