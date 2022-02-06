const axios = require("axios");

exports.search = async (req, res) => {
    try {
        const barcode = req.params.barcode;
        const endpoint = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
        console.log(endpoint);
        axios.get(endpoint)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log(err.message);
            console.log('test');
        });
    }
    catch(err) {
        res.send({
            success: false,
            error: err
        });
    }
}