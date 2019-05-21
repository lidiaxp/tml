"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const avaliacaoSchema = new mongoose.Schema({
    avaliador: {
        type: String
    },
    avaliado: {
        type: String
    },
    nota: {
        type: Number
    },
    comentario: {
        type: String
    },
});
exports.Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);
