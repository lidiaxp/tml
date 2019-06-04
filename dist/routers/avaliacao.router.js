"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const avaliacao_model_1 = require("../model/avaliacao.model");
const authz_handler_1 = require("../security/authz.handler");
class AvaliacaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(avaliacao_model_1.Avaliacao);
        this.findById = (req, resp, next) => {
            this.model.findOne({ _id: req.params.id })
                .populate('usuario', 'nome');
            this.prepareOne(this.model.findOne({ _id: req.params.id }))
                .then(this.render(resp, next)).catch(next);
        };
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/avaliacao', this.findAll);
        application.get('/avaliacao/:id', [this.validateId, this.findById]);
        application.post('/avaliacao', [authz_handler_1.authorize('adimin'), this.save]);
        application.put('/avaliacao/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.replace]);
        application.patch('/avaliacao/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.update]);
        application.del('/avaliacao/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.delete]);
    }
}
exports.avaliacaoRouter = new AvaliacaoRouter();
