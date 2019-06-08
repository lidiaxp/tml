"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("../model/usuario.model");
const jwt = require("jsonwebtoken");
const environment_1 = require("../common/environment");
// função tokenParser ainda não vai fazer a autorização, vai apenas verificar se existe um token
exports.tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
// buscando o usuario na base 
function extractToken(req) {
    //Authorization: Bearer TOKEN 
    let token = undefined;
    const autorizacao = req.header('autorizacao');
    if (autorizacao) {
        const parts = autorizacao.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
// associar o usuario no request
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            usuario_model_1.Usuario.findByEmail(decoded.sub).then(usuario => {
                if (usuario) {
                    // associar o usuario no request
                    req.authenticated = usuario; // 
                }
                next();
            }).catch(next);
        }
        else {
            next();
        }
    };
}
