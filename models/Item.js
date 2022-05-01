const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({

    // Have to add listname and authentication
    
    // list: {
    //     type: String,
    //     required: true
    // },

    url: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    isOpen: {
        type: Boolean,
        required: true
    }

});

module.exports = Item = mongoose.model("item", ItemSchema)