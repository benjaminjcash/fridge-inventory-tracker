const mongoose = require("mongoose");

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

module.exports = mongoose.model('Produce', ProduceSchema);
