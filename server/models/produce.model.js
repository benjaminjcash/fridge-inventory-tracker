const mongoose = require("mongoose");
const Item = require('./item.model');
const Schema = mongoose.Schema;

const ProduceSchema = new Schema({
    name: {
        type: String,
        required: "An produce name is required to create a new produce."
    },
    type: {
        type: String,
        required: "A type is required to create a produce."
    },
    image_url: {
        type: String
    },
    shelf_life : {
        type: Number,
        required: true
    }
});

ProduceSchema.pre('remove', function(next) {
  Item.remove({ produce_id: this._id }).exec();
  next();
})

module.exports = mongoose.model('Produce', ProduceSchema);
