"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const denuncia_model_1 = require("../model/denuncia.model");
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
        application.get('/denuncia', /** [authorized('usuario'),*/ this.findAll);
        application.get('/denuncia/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/denuncia', /** [authorized('usuario'),*/ this.save);
        application.put('/denuncia/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/denuncia/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/denuncia/:id', /** [authorized('usuario'),*/ this.validateId, this.delete);
    }
}
exports.denunciaRouter = new DenunciaRouter();
