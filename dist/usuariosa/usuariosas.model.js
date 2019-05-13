"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const enderecoSchema = new mongoose.Schema({
    estado: {
        type: String,
        enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    },
    cidade: {
        type: String,
    },
    cep: {
        type: String
    },
    numero: {
        type: String,
        maxlength: 8
    },
    complemento: {
        type: String,
        maxlength: 30
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
        required: true
    },
    telefone: {
        type: String
    }
});
const usuarioSalaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 2 // minimo de caracteres de nome
    },
    cpf: {
        type: String,
        require: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF({VALUE})'
        }
    },
    senha: {
        type: String,
        select: false,
        required: true
    },
    codigo: {
        type: String,
        maxlength: 10
    },
    contatos: {
        type: [contatosSchema],
        required: false,
        select: false,
        default: []
    },
    endereco: {
        type: [enderecoSchema],
        required: false,
        select: false,
        default: []
    },
    espacoBarbeiro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BarbeiroEspaco',
        required: true
    },
    espacoCabelereiro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CabelereiroEspaco',
        required: true
    },
    espacoDepilacao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepilacaoEspaco',
        required: true
    },
    espacoManicure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManicureEspaco',
        required: true
    },
    espacoMaquiagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaquiagemEspaco',
        required: true
    },
    espacoTatoagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TatoadorEspaco',
        required: true
    }
});
exports.UsuarioSalao = mongoose.model('UsuarioSalao', usuarioSalaoSchema);
