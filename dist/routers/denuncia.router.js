"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const denuncia_model_1 = require("../model/denuncia.model");
class DenunciaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(denuncia_model_1.Denuncia);
    }
    applyRoutes(application) {
        application.get('/denuncia', this.findAll);
        application.get('/denuncia/:id', [this.validateId, this.findById]);
        application.post('/denuncia', this.save);
        application.put('/denuncia/:id', [this.validateId, this.replace]);
        application.patch('/denuncia/:id', [this.validateId, this.update]);
        application.del('/denuncia/:id', [this.validateId, this.delete]);
    }
}
exports.denunciaRouter = new DenunciaRouter();
