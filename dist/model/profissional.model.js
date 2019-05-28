"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const preferidoSchema = new mongoose.Schema({
    saloes: {
        type: mongoose.Types.ObjectId
    }
});
const profissaoSchema = new mongoose.Schema({
    nome: {
        type: mongoose.Types.ObjectId
    }
});
const profissionalSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId
    },
    profissao: {
        type: [profissaoSchema]
    },
    foto_perfil: {
        type: String
    },
    preferido: {
        type: [preferidoSchema]
    },
    portifolio: {
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Profissional = mongoose.model('Profissional', profissionalSchema);
