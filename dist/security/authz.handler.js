"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
// ela vai receber os perfils e retornar um requesthendler
exports.authorized = (...profiles) => {
    return (req, resp, next) => {
        if (req.authenticated !== undefined) {
            next();
        }
        else {
            next(new restify_errors_1.ForbiddenError('Permissão Negada'));
        }
    };
};
