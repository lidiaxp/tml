"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const pagamento_model_1 = require("../model/pagamento.model");
class PagamentoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pagamento_model_1.ContaPagamento);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/pagamento', /** [authorized('usuario'),*/ this.findAll);
        application.get('/pagamento/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/pagamento', /** [authorized('usuario'),*/ this.save);
        application.put('/pagamento/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/pagamento/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/pagamento/:id', /** [authorized('usuario'),*/ this.validateId, this.delete);
    }
}
exports.pagamentoRouter = new PagamentoRouter();
