"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
    especialidade: {
        type: String
    },
    fotos: {
        type: [String]
    }
});
exports.Portfolio = mongoose.model('Portfolio', portfolioSchema);
