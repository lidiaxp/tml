"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// aplicando os Schemas
const kitSchema = new mongoose.Schema({
    produto: {
        type: String,
        required: true
    },
    quantidade: {
        type: String,
        required: true
    }
});
const salaoSchema = new mongoose.Schema({
    espaco: {
        type: String,
        required: true,
        enum: ['Manicure', 'Cabelereiro', 'Maquiagem', 'Barbiaria', 'Tatoador', 'Esteticista']
    },
    salas: {
        type: Number,
        required: true
    },
    precoHora: {
        type: Number,
        required: true
    },
    kit: {
        type: [kitSchema],
        required: false,
        select: false,
        default: []
    }
});
exports.Salao = mongoose.model('Salao', salaoSchema);
