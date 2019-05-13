"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fotosSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    foto: {
        type: String
    }
});
const barbeiroEspacoSchema = new mongoose.Schema({
    comentario: {
        type: String,
        required: true,
        maxlength: 100
    },
    salas: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    itens: {
        types: String,
        required: true,
        maxlength: 100
    },
    fotos: {
        type: [fotosSchema],
        required: false,
        select: false,
        default: []
    }
});
exports.BarbeiroEspaco = mongoose.model('BarbeiroSalao', barbeiroEspacoSchema);
