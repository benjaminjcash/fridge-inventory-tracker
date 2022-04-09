const mongoose = require("mongoose");
const Item = require('./item.model');

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
    upc_data: {
        type: String,
        required: true
    },
    upc_code: {
      type: String,
      required: true,
      unquie: true
    }
});

ProductSchema.pre('remove', function(next) {
  Item.remove({ product_id: this._id }).exec();
  next();
})

module.exports = mongoose.model('Product', ProductSchema);
