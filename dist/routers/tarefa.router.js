"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
class TarefaRouter extends model_router_1.ModelRouter {
    applyRoutes(application) {
        application.get('/tarefas', this.findAll);
        application.get('/tarefas/:id', [this.validateId, this.findById]);
        application.post('/tarefas', this.save);
        application.put('/tarefas/:id', [this.validateId, this.replace]);
    }
}
