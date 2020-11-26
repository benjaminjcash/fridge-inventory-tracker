const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: "An item name is required to create a new item."
    },
    type: {
        type: String,
        required: "A type is required to create an item."
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    image_url: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', ItemSchema);
