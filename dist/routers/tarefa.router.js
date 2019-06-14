"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const tarefa_model_1 = require("../model/tarefa.model");
class TarefaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(tarefa_model_1.Tarefa);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/tarefas', /** [authorized('usuario'),*/ this.findAll);
        application.get('/tarefas/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/tarefas', /** [authorized('usuario'),*/ this.save);
        application.put('/tarefas/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/tarefas/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/tarefas/:id', /** [authorized('usuario'),*/ this.validateId, this.delete);
    }
}
exports.tarefaRouter = new TarefaRouter();
