"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const avaliacaoSchema = new mongoose.Schema({
    avaliador: {
        type: mongoose.Schema.Types.ObjectId
    },
    avaliado: {
        type: mongoose.Schema.Types.ObjectId
    },
    nota: {
        type: Number
    },
    comentario: {
        type: String
    },
}, { versionKey: false });
exports.Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);
