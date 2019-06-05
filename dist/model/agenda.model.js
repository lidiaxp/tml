"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Schema 
const agendaSchema = new mongoose.Schema({
    tarefa: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    salao: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
}, { versionKey: false });
exports.Agenda = mongoose.model('Agenda', agendaSchema);
