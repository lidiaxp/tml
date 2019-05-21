"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bson_1 = require("bson");
// aplicando os Schemas
// schema de salão Franquia
const franquiaSchema = new mongoose.Schema({
    nomefranquia: {
        type: String,
    },
    quantidadeFranquia: {
        type: Number,
        maxlength: 5,
        minlength: 2
    },
    enderecoFranquias: {
        type: String
    }
});
// schema de conta do salão
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
    preferidos: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
// schema principal
const salaoSchema = new mongoose.Schema({
    idSalao: {
        type: String,
    },
    salasDisponiveis: {
        type: Number,
        required: true
    },
    precoHora: {
        type: Number,
        required: true
    },
    selecionarDias: {
        type: Date
    },
    selecionarHora: {
        type: bson_1.Timestamp
    },
    comentarios: {
        type: String
    },
    statusSalao: {
        type: Boolean
    },
    estadoMaterial: {
        type: String
    },
    estacionamento: {
        type: Boolean
    },
    aceitarAluguel: {
        type: Boolean
    },
    cobrarAtraso: {
        type: Boolean
    },
    historicoSalao: {
        type: String,
    },
    preferido: {
        type: [preferidoSchema],
        required: false
    },
    kit: {
        type: [kitSchema],
        tipodeKit: String,
        quantidade: String,
        default: []
    },
    franquia: {
        type: [franquiaSchema],
    },
    dadosCartao: {
        type: [contaSalaoSchema],
    }
});
exports.Salao = mongoose.model('Salao', salaoSchema);
