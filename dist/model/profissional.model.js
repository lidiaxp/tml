"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const preferidoSchema = new mongoose.Schema({
    saloes: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
const profissaoSchema = new mongoose.Schema({
    servico: {
        type: String,
        required: true
    }
});
const profissionalSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuario'
    },
    comentarios: {
        type: String,
        required: true,
        select: true
    }
});
exports.Profissional = mongoose.model('Profissional', profissionalSchema);
