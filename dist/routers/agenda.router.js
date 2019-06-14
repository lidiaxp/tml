"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const agenda_model_1 = require("../model/agenda.model");
class AgendaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(agenda_model_1.Agenda);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/agenda', /** [authorized('usuario'),*/ this.findAll);
        application.get('/agenda/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/agenda', /** [authorized('usuario'),*/ this.save);
        application.put('/agenda/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/agenda/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/agenda/:id', /** [authorized('usuario'),*/ this.validateId, this.delete);
    }
}
exports.agendaRouter = new AgendaRouter();
