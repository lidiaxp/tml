"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const pagamento_model_1 = require("../model/pagamento.model");
class PagamentoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pagamento_model_1.ContaPagamento);
    }
    applyRoutes(application) {
        application.get('/pagamento', this.findAll);
        application.get('/pagamento/:id', [this.validateId, this.findById]);
        application.post('/pagamento', this.save);
        application.put('/pagamento/:id', [this.validateId, this.replace]);
        application.patch('/pagamento/:id', [this.validateId, this.update]);
        application.del('/pagamento/:id', [this.validateId, this.delete]);
    }
}
exports.pagamentoRouter = new PagamentoRouter();
