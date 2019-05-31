"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const especialidade_model_1 = require("../model/especialidade.model");
class EspecialidadeRouter extends model_router_1.ModelRouter {
    constructor() {
        super(especialidade_model_1.Especialidade);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/especialidade', this.findAll);
        application.get('/especialidade/:id', [this.validateId, this.findById]);
        application.post('/especialidade', this.save);
        application.put('/especialidade/:id', [this.validateId, this.replace]);
        application.patch('/especialidade/:id', [this.validateId, this.update]);
        application.del('/especialidade/:id', [this.validateId, this.delete]);
    }
}
exports.especialidadeRouter = new EspecialidadeRouter();
