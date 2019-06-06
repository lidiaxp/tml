"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const salao_model_1 = require("../model/salao.model");
// Salao é do arquivo model, Salão franquia é do Interface
class SalaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(salao_model_1.Salao);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        // CRUD basico
        application.get('/salao', this.findAll);
        application.get('/salao/:id', [this.validateId, this.findById]);
        application.post('/salao', /*[authorize('usuario'),/** */ this.save);
        application.put('/salao/:id', /*[authorize('usuario'),/** */ this.validateId, this.replace);
        application.patch('/salao/:id', /*[authorize('usuario'),/** */ this.validateId, this.update);
        application.del('/salao/:id', /*[authorize('usuario'),/** */ this.validateId, this.delete);
    }
}
exports.salaoRouter = new SalaoRouter();
