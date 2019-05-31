"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const tarefa_model_1 = require("../model/tarefa.model");
class TarefaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(tarefa_model_1.Tarefa);
        this.findAll = (req, resp, next) => {
            var search = req.query.descricao;
            this.model.find({ descricao: new RegExp(search) })
                .sort({ "data": 1 })
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/tarefas', this.findAll);
        application.get('/tarefas/:id', [this.validateId, this.findById]);
        application.post('/tarefas', this.save);
        application.put('/tarefas/:id', [this.validateId, this.replace]);
        application.patch('/tarefas/:id', [this.validateId, this.update]);
        application.del('/tarefas/:id', [this.validateId, this.delete]);
    }
}
exports.tarefaRouter = new TarefaRouter();
