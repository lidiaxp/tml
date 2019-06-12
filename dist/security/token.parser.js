"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const usuario_model_1 = require("../model/usuario.model");
const environment_1 = require("../common/environment");
// verificar para ver se aquele token é um token real
exports.tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
// processo de extração do token
function extractToken(req) {
    let token = undefined;
    // esperamos que o token venha como um heade
    // authenticate: Bearer(portador do token) TOKEN 
    const authorization = req.header('authorization');
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]; // retornando apensar o token
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            usuario_model_1.Usuario.findByEmail(decoded.Sub).then(usuario => {
                if (usuario) {
                    // associar o usuario no request
                    req.authenticated = usuario;
                }
                next();
            }).catch(next);
        }
        else {
            next();
        }
    };
}
