"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bancasSchema = new mongoose.Schema({
    tipo: {
        type: String
    },
    status: {
        type: Boolean,
    },
    fotoFachada: {
        type: String,
    }
});
const diasSchema = new mongoose.Schema({
    nomeSemana: {
        type: String
    },
    horaInicio: {
        type: String,
    },
    inicioIntervalo: {
        type: String
    },
    fimIntervalo: {
        type: String
    },
    horarioFim: {
        type: String
    }
});
const redeSocialSchema = new mongoose.Schema({
    tipo: {
        type: String
    },
    descricao: {
        type: String,
    }
});
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
const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String
    },
    numero: {
        type: Number
    },
    cep: {
        type: String
    },
    bairro: {
        type: String
    },
    complemento: {
        type: String
    },
    cidade: {
        type: String
    },
    estado: {
        type: String
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
    dono: {
        type: mongoose.Schema.Types.ObjectId
    },
    gerente: {
        type: mongoose.Schema.Types.ObjectId
    },
    nomefranquia: {
        type: String
    },
    enderecoFranquias: {
        type: enderecoSchema
    },
    redeSocial: {
        type: redeSocialSchema
    },
    fotoFachada: {
        type: String
    },
    bancas: {
        type: [bancasSchema]
    },
    dias: {
        type: [diasSchema]
    },
    comentarios: {
        type: String
    },
    kit: {
        type: [kitSchema]
    },
    estacionamento: {
        type: Boolean
    },
    tipo: {
        type: String
    },
    saldoVirtual: {
        type: Number
    },
    preferido: {
        type: [preferidoSchema]
    }
});
exports.Salao = mongoose.model('Salao', salaoSchema);
