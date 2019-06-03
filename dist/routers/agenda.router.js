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
        application.get('/agenda', this.findAll);
        application.get('/agenda/:id', [this.validateId, this.findById]);
        application.post('/agenda', this.save);
        application.put('/agenda/:id', [this.validateId, this.replace]);
        application.patch('/agenda/:id', [this.validateId, this.update]);
        application.del('/agenda/:id', [this.validateId, this.delete]);
    }
}
exports.agendaRouter = new AgendaRouter();
