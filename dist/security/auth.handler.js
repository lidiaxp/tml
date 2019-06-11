"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const usuario_model_1 = require("../model/usuario.model");
// tipando a constante.
// para ter autenticação, tem que ter duas resposta que devem vir do body da resposta
exports.authenticate = (req, resp, next) => {
    const { email, senha } = req.body; // informações que vem do request
    usuario_model_1.Usuario.findByEmail(email, '+senha').then(usuario => {
        // verificar se existe um usuario com aquele email
        if (usuario && usuario.matches(senha)) {
            // gerar token 
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('credenciais invalidas'));
        }
    }).catch(next);
};
