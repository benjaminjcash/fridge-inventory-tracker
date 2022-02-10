const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: "An item name is required to create a new item."
    },
    type: {
        type: String,
        required: "A type is required to create an item."
    },
    image_url: {
        type: String
    },
    shelf_life : {
        type: Number,
        required: true
    },
    upc_data: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);
