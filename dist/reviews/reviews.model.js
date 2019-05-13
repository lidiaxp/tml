"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        require: true,
        maxlength: 150
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.Review = mongoose.model('Review', reviewSchema);
