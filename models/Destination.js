const mongoose = require("mongoose");

// Destination Schema
const destinationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    description: {
        type: String
    },

    bestSeason: {
        type: String
    }

});

// Create Model
const Destination = mongoose.model(
    "Destination",
    destinationSchema
);

module.exports = Destination;