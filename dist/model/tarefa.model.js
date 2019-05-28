"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const tarefaSchema = new mongoose.Schema({
    descricao: {
        type: String
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId
    },
    cliente: {
        type: String
    },
    observacao: {
        type: String
    },
    data: {
        type: Date,
    },
    status: {
        type: Boolean,
        enum: false
    },
});
exports.Tarefa = mongoose.model('Tarefa', tarefaSchema);
