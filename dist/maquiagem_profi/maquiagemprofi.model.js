"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Schemas
const fotosSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    foto: {
        type: String
    }
});
const servicoMaquiagemSchema = new mongoose.Schema({
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
exports.ServicoMaquiagem = mongoose.model('MaquiagemProfi', servicoMaquiagemSchema);
