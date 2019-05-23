"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// aplicando os Schemas
const contaSalaoSchema = new mongoose.Schema({
    saldoVirtual: {
        type: Number,
        minlength: 10 // minimo ao criar a conta do salão para já possuir algo em saldo
    },
    contaCorrente: {
        type: String,
    },
    nomeCartao: {
        type: String,
    },
    numeroCartao: {
        type: Number,
        maxlength: 16
    },
    codCartao: {
        type: Number,
        maxlength: 3
    }
});
// schema de kit de produtos do salão
const kitSchema = new mongoose.Schema({
    produto: {
        type: String,
        required: true
    },
    quantidade: {
        type: String,
        required: true
    },
    qualidade: {
        type: String,
        required: false
    }
});
const preferidoSchema = new mongoose.Schema({
    preferido: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
// schema principal
const salaoSchema = new mongoose.Schema({
    idSalao: {
        type: String
    },
    bancas: {
        type: String,
        status: Boolean
    },
    precoHora: {
        type: Number,
        required: true
    },
    tipo: {
        type: String
    },
    selecionarDias: {
        type: Date
    },
    selecionarHora: {
        type: Timestamp
    },
    comentarios: {
        type: String
    },
    estacionamento: {
        type: Boolean
    },
    fotoSalao: {
        type: String
    },
    fotoBanner: {
        type: String
    },
    fotoBancadas: {
        type: String
    },
    historicoSalao: {
        type: String,
        hora: Date
    },
    preferido: {
        type: [preferidoSchema],
        required: false
    },
    kit: {
        type: [kitSchema],
        tipodeKit: String,
        quantidade: String,
        default: [],
    },
    dadosCartao: {
        type: [contaSalaoSchema]
    }
});
exports.Salao = mongoose.model('Salao', salaoSchema);
