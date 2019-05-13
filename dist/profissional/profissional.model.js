"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const profissionalSchema = new mongoose.Schema({
    servico: {
        type: String,
        required: true,
        select: true,
        enum: ['Maquiadora', 'Manicure', 'Cabelereira', 'Barbeiro', 'Esteticista', 'Tatoadora']
    },
    tipo: {
        type: String,
        required: false,
        select: false
    },
    comentarios: {
        type: String,
        required: true,
        select: true
    }
});
exports.Profissional = mongoose.model('Profissional', profissionalSchema);
