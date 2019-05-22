"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
const localizacaoSchema = new mongoose.Schema({
    latitude: {
        type: String
    },
    longitude: {
        type: Number
    }
});
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },
    cpf: {
        type: String,
        unique: true
    },
    codigo: {
        type: String
    },
    nascimento: {
        type: Date
    },
    saldoConta: {
        type: Number
    },
    endereco: {
        type: [enderecoSchema]
    },
    concaCorrente: {
        type: String
    },
    status: {
        type: Boolean
    },
    perfil: {
        type: Number
    },
    contatos: {
        type: [String]
    },
    localizacao: {
        type: [localizacaoSchema]
    },
    recomendado1: {
        type: [String]
    },
    recomendado2: {
        type: [String]
    },
    avaliacao: {
        type: mongoose.Schema.Types.ObjectId
    },
    denuncia: {
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Usuario = mongoose.model('Usuario', usuarioSchema);
