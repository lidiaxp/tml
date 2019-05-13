"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Barbeiro Schema
const fotosSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    foto: {
        type: String
    }
});
const servicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        maxlength: 60
    },
    fotos: {
        type: [fotosSchema],
        required: false,
        select: false,
        default: []
    }
});
const servicoBarbeiroSchema = new mongoose.Schema({
    servicos: {
        type: [servicoSchema],
        required: true,
        select: true,
    }
});
exports.ServicoBarbeiro = mongoose.model('BarbeiroProfi', servicoBarbeiroSchema);
