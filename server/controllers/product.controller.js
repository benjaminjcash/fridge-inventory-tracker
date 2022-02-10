const axios = require("axios");
const { doCreateProduct } = require("../data/product.dal");

exports.search = async (req, res) => {
    try {
        const barcode = req.params.barcode;
        const endpoint = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
        axios.get(endpoint)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    catch(err) {
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
        console.error(err);
        res.send({
            success: false,
            error: err
        });
    }
}