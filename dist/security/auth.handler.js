"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const usuario_model_1 = require("../model/usuario.model");
const environment_1 = require("../common/environment");
// tipando a constante.
// para ter autenticação, tem que ter duas resposta que devem vir do body da resposta
exports.authenticate = (req, resp, next) => {
    const { email, senha } = req.body; // informações que vem do request
    usuario_model_1.Usuario.findByEmail(email, '+senha').then(usuario => {
        // verificar se existe um usuario com aquele email
        if (usuario && usuario.senha) { // se o usuario existir 
            // gerar token 
            const token = jwt.sign({ Sub: usuario.email, iss: 'misslaura' }, environment_1.environment.security.apiSecret);
            resp.json({ nome: usuario.nome, email: usuario.email, acessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('credenciais invalidas'));
        }
    }).catch(next);
};
