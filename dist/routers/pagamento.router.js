"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const authz_handler_1 = require("../security/authz.handler");
class PagamentoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(ContaPagamento);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/pagamento', [authz_handler_1.authorized('usuario'), this.findAll]);
        application.get('/pagamento/:id', [authz_handler_1.authorized('usuario'), this.validateId, this.findById]);
        application.post('/pagamento', [authz_handler_1.authorized('usuario'), this.save]);
        application.put('/pagamento/:id', [authz_handler_1.authorized('usuario'), this.validateId, this.replace]);
        application.patch('/pagamento/:id', [authz_handler_1.authorized('usuario'), this.validateId, this.update]);
        application.del('/pagamento/:id', [authz_handler_1.authorized('usuario'), this.validateId, this.delete]);
    }
}
exports.pagamentoRouter = new PagamentoRouter();
