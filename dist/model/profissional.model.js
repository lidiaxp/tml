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
    profissao: {
        type: [profissaoSchema],
        required: true
    },
    foto_perfil: {
        type: String,
        required: false
    },
    preferido: {
        type: [preferidoSchema],
        required: false
    }
});
exports.Profissional = mongoose.model('Profissional', profissionalSchema);
