"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const profissional_model_1 = require("../model/profissional.model");
class ProfissionalRouter extends model_router_1.ModelRouter {
    constructor() {
        super(profissional_model_1.Profissional);
    }
    applyRoutes(application) {
        application.del('/profissional/:id',this.delete)
        application.get('/profissional', this.findAll);
        application.get('/profissional/:id', [this.validateId, this.findById]);
        application.post('/profissional', this.save);
        application.put('/profissional/:id', [this.validateId, this.replace]);
        application.patch('/profissional/:id', [this.validateId, this.update]);
    }
}
exports.profissionalRouter = new ProfissionalRouter();
