"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
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
const contatoSchema = new mongoose.Schema({
    email: {
        type: [String]
    },
    telefone: {
        type: [String]
    },
    redeSocial: {
        type: [String]
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
        type: String
    },
    foto: {
        type: [Number]
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
    fotoPerfil: {
        type: String
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
        type: [contatoSchema]
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
        type: [mongoose.Schema.Types.ObjectId]
    },
    denuncia: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    profiles: {
        type: [String],
        required: false
    }
}, { versionKey: false });
usuarioSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
usuarioSchema.methods.matches = function (senha) {
    return bcrypt.compareSync(senha, this.senha);
};
usuarioSchema.methods.hasAny = function (...profiles) {
    return profiles.some(profiles => this.profiles.indexOf(profiles) !== -1);
};
const hashSenha = (obj, next) => {
    bcrypt.hash(obj.senha, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.senha = hash;
        next();
    }).catch;
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('senha')) {
        next();
    }
    else {
        hashSenha(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().senha) {
        next();
    }
    else {
        hashSenha(this.getUpdate(), next);
    }
};
usuarioSchema.pre('save', saveMiddleware);
usuarioSchema.pre('findOneAndUpdate', updateMiddleware);
usuarioSchema.pre('update', updateMiddleware);
exports.Usuario = mongoose.model('Usuario', usuarioSchema);
