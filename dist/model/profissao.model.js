"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const profissaoSchema = new mongoose.Schema({
    nome: {
        type: String
    }
}, { versionKey: false });
exports.Profissao = mongoose.model('Profissao', profissaoSchema);
