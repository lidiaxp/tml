"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const avaliacaocliente_model_1 = require("./avaliacaocliente.model");
class AvaliacaoClienteRotas extends model_router_1.ModelRouter {
    constructor() {
        super(avaliacaocliente_model_1.AvaliacaoCliente);
    }
    applyRoutes(application) {
        application.get('/avaliacao_cliente', this.findAll);
        application.get('/avaliacao_cliente/:id', [this.validateId, this.findById]);
        application.post('/avaliacao_cliente', this.save);
    }
}
