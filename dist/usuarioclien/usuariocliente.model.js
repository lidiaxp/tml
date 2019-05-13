"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const enderecoSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
        enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    },
    cidade: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true,
        maxlength: 12
    },
    numero: {
        type: String,
        required: true,
        maxlength: 5
    },
    complemento: {
        type: String,
        required: true,
        maxlength: 25
    }
});
const contatosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    celular: {
        type: String,
        unique: true,
        required: true
    },
    instagram: {
        type: String,
        unique: true,
        required: true
    },
    facebook: {
        type: String,
        unique: true,
        required: true
    }
});
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 40,
        minlength: 1
    },
    rg: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        require: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF({VALUE})'
        }
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 2
    },
    nascimento: {
        type: Date,
        required: true
    },
    contatos: {
        type: [contatosSchema],
        required: true,
        select: true
    },
    endereco: {
        type: [enderecoSchema],
        required: true,
        select: true
    },
    perfilProfissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissao',
        required: true
    },
    perfilSalao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espaco',
        required: true
    }
});
exports.Usuario = mongoose.model('Usuario', usuarioSchema);
