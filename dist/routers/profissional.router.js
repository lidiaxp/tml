"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const profissional_model_1 = require("../model/profissional.model");
class ProfissionalRouter extends model_router_1.ModelRouter {
    constructor() {
        super(profissional_model_1.Profissional);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.del('/profissional/:id', /** [authorized('usuario'),*/ this.delete); // tem que colocar []
        // foi retirado e colocado a exclamacao do metodo validate
        application.get('/profissional', /** [authorized('usuario'),*/ this.findAll);
        // método validate estava dando erro por causa do ! e o findId mudou o findById para findOne
        application.get('/profissional/:id', /** [authorized('usuario'),*/ this.findById);
        application.post('/profissional', /**  [authorized('usuario'),*/ this.save);
        application.put('/profissional/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/profissional/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
    }
}
exports.profissionalRouter = new ProfissionalRouter();
