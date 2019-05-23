"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// schema 
const servicoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        maxlength: 50
    },
    descricao: {
        type: String,
        required: false,
        maxlength: 300
    },
    cliente: {
        type: String,
        required: true,
        maxlength: 50
    },
    status: {
        type: Number,
        required: true,
        enum: 0 // status de a fazer
    }
});
const tarefaSchema = new mongoose.Schema({
    servico: {
        type: [servicoSchema],
        required: false,
    },
    realizador: {
        type: mongoose.Schema.Types.ObjectId
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId
    },
    data: {
        type: Date,
    },
    status: {
        type: Number,
    }
});
exports.Tarefa = mongoose.model('Tarefa', tarefaSchema);
