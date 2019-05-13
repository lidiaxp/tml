"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const usuariocliente_model_1 = require("./usuariocliente.model");
class UsuarioRouter extends model_router_1.ModelRouter {
    constructor() {
        super(usuariocliente_model_1.Usuario);
    }
    applyRoutes(application) {
        application.get('/usuarioclien', this.findAll);
        application.get('/usuarioclien/:id', [this.validateId, this.findById]);
        application.post('/usuarioclien', this.save);
        application.put('/usuarioclien/:id', [this.validateId, this.replace]);
        application.patch('/usuarioclien/:id', [this.validateId, this.update]);
        application.del('/usuarioclien/:id', [this.validateId, this.delete]);
    }
}
exports.usuarioRouter = new UsuarioRouter();
