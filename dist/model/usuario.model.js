"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
// export interface UsuarioModel extends mongoose.Model<Usuario>{
//   findByPreferido(preferido:mongoose.Types.ObjectId | Usuario): Promise<Usuario>
// }
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
const avaliacaoSchema = new mongoose.Schema({
    avaliador: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        selec: false
    },
    nota: {
        type: Number,
        required: false,
    },
    comentario: {
        type: String,
        required: false,
        maxlength: 120
    }
});
const fotosSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: false,
        select: false
    },
    imagem: {
        type: String,
        required: false,
        select: false
    }
});
const preferidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        select: false
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
        type: String,
        required: true
    },
    contatos: {
        type: [contatosSchema],
        required: false,
        select: false
    },
    endereco: {
        type: [enderecoSchema],
        required: false,
        select: false
    },
    fotos: {
        type: [fotosSchema],
        required: false,
        select: false
    },
    avaliacao: {
        type: [avaliacaoSchema],
        required: false,
        select: false
    },
    preferido: {
        type: [preferidoSchema],
        required: false,
        select: false
    },
    perfilProfissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissao',
        required: false
    },
    perfilSalao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salao',
        required: false
    }
});
// usuarioSchema.static.findByPreferido = function(preferido: mongoose.Schema.Types.ObjectId){
//   return this.findOne({preferido})
// }
exports.Usuario = mongoose.model('Usuario', usuarioSchema);
