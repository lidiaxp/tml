"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("../model/usuario.model");
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const environment_1 = require("../common/environment");
// feito por yuri pimentel
exports.autenticacao = (req, resp, next) => {
    const { email, senha } = req.body; // fazendo a busca de autenticação pelo email
    usuario_model_1.Usuario.findByEmail(email, '+senha')
        .then(usuario => {
        if (usuario && usuario.matches(senha)) {
            // aqui vai ser gerado o token
            const token = jwt.sign({ sub: usuario.email, iss: 'misslaura' }, environment_1.environment.security.apiSecret);
            resp.json({ nome: usuario.nome, email: usuario.email, acessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('credenciais invalidas'));
        }
    }).catch(next);
};
