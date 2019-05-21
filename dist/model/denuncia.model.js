"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const denunciaSchema = new mongoose.Schema({
    denunciador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuario'
    },
    denunciado: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuario'
    },
    denuncia: {
        type: String,
        required: true
    }
});
exports.Denuncia = mongoose.model('denuncia', denunciaSchema);
