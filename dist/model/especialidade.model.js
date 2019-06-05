"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const especialidadeSchema = new mongoose.Schema({
    usuario: {
        type: String
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId
    }
}, { versionKey: false });
exports.Especialidade = mongoose.model('Especialidade', especialidadeSchema);
