const Product = require("../models/product.model");

exports.doCreateProduct = async (req) => {
    console.log(req.body);
    const newProduct = new Product({
        name: '',
        type: '',
        image_url: '',
        shelf_life : '',
        upc_data: '',
    });
    return newProduct.save()
        .then((data) => {
            return data;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}