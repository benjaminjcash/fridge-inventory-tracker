const Product = require("../models/product.model");

exports.doCreateProduct = async (req) => {
    const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
        image_url: req.body.image_url,
        shelf_life : 0,
        upc_data: req.body.image_url,
    });
    return newProduct.save()
        .then((data) => {
            return data;
        }).catch(err => {
            console.error(err);
            throw err;
        });
}