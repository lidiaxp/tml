"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const avaliacao_model_1 = require("../model/avaliacao.model");
class AvaliacaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(avaliacao_model_1.Avaliacao);
    }
    applyRoutes(application) {
        application.get('/avaliacao', this.findAll);
        application.get('/avaliacao/:id', [this.validateId, this.findById]);
        application.post('/avaliacao', this.save);
        application.put('/avaliacao/:id', [this.validateId, this.replace]);
        application.patch('/avaliacao/:id', [this.validateId, this.update]);
        application.del('/avaliacao/:id', [this.validateId, this.delete]);
    }
}
exports.avaliacaoRouter = new AvaliacaoRouter();
