"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const denuncia_model_1 = require("../model/denuncia.model");
const authz_handler_1 = require("../security/authz.handler");
class DenunciaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(denuncia_model_1.Denuncia);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/denuncia', this.findAll);
        application.get('/denuncia/:id', [this.validateId, this.findById]);
        application.post('/denuncia', [authz_handler_1.authorize('adimin'), this.save]);
        application.put('/denuncia/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.replace]);
        application.patch('/denuncia/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.update]);
        application.del('/denuncia/:id', [authz_handler_1.authorize('adimin'), this.validateId, this.delete]);
    }
}
exports.denunciaRouter = new DenunciaRouter();
