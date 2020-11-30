const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommonItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    shelf_life : {
        type: Number,
        required: true
    },
    image_url: {
        type: String
    }
});

module.exports = mongoose.model('CommonItem', CommonItemSchema);