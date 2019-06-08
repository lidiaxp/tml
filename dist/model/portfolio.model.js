"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
    fotos: {
        type: [String]
    }
}, { versionKey: false });
exports.Portfolio = mongoose.model('Portfolio', portfolioSchema);
