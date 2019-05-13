"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const avaliacaoClienteSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true,
        maxlength: 150
    },
    usuarioprofi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuarioProfi',
        required: true
    },
    usuariosalao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuarioSalao',
        require: true
    }
});
exports.AvaliacaoCliente = mongoose.model('AvaliacaoCliente', avaliacaoClienteSchema);
