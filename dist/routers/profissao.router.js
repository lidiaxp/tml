"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const profissao_model_1 = require("../model/profissao.model");
class ProfissaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(profissao_model_1.Profissao);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/profissao', /** [authorized('usuario'),*/ this.findAll);
        application.get('/profissao/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/profissao', /** [authorized('usuario'),*/ this.save);
        application.put('/profissao/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/profissao/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/profissao/:id', /** [authorized('usuario'),*/ this.validateId, this.delete);
    }
}
exports.profissaoRouter = new ProfissaoRouter();
