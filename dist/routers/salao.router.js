"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
const salao_model_1 = require("../model/salao.model");
class SalaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(salao_model_1.Salao);
        this.findKit = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+kit").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('restaurante não encontrado');
                }
                else {
                    resp.json(salao.kit);
                    return next();
                }
            }).catch(next);
        };
        this.replaceKit = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('restaurante não encontrado');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.kit);
                return next();
            }).catch(next);
        };
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post('/salao', this.save);
        application.put('/salao/:id', [this.validateId, this.replace]);
        application.patch('/salao/:id', [this.validateId, this.update]);
        application.get('/salao/:id/kit', [this.validateId, this.findKit]);
        application.put('/salao/:id/kit', [this.validateId, this.findKit]);
    }
}
exports.salaoRouter = new SalaoRouter();
