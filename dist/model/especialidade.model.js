"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const especialidadeSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Especialidade = mongoose.model('Especialidade', especialidadeSchema);
