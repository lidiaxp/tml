"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Schema 
const tarefasSchema = new mongoose.Schema({
    tarefa: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
const agendaSchema = new mongoose.Schema({
    tarefa: {
        type: [tarefasSchema],
        required: false
    },
    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    salao: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
exports.Agenda = mongoose.model('Agenda', agendaSchema);
