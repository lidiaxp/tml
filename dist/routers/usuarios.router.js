"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const usuario_model_1 = require("../model/usuario.model");
class UsuarioRouter extends model_router_1.ModelRouter {
    constructor() {
        super(usuario_model_1.Usuario);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        //  rotas de cadastro do usuário
        application.get('/usuarios', this.findAll);
        application.get('/usuarios/:id', [this.validateId, this.findById]);
        application.post('/usuarios', this.save);
        application.put('/usuarios/:id', [this.validateId, this.replace]);
        application.patch('/usuarios/:id', [this.validateId, this.update]);
        application.del('/usuarios/:id', [this.validateId, this.delete]);
    }
}
exports.usuarioRouter = new UsuarioRouter();
