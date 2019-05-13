"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const usuario_model_1 = require("../model/usuario.model");
class UsuarioRouter extends model_router_1.ModelRouter {
    constructor() {
        super(usuario_model_1.Usuario);
        this.findContatos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+contatos").then(cont => {
                if (!cont) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    resp.json(cont.contatos);
                    return next();
                }
            }).catch(next);
        };
        this.replaceContatos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    rest.contatos = req.body; // um array
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.contatos);
                return next();
            }).catch(next);
        };
        this.findEndereco = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+endereco").then(cont => {
                if (!cont) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    resp.json(cont.endereco);
                    return next();
                }
            }).catch(next);
        };
        this.replaceEndereco = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(usu => {
                if (!usu) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    usu.endereco = req.body; // um array
                    return usu.save();
                }
            }).then(usu => {
                resp.json(usu.endereco);
                return next();
            }).catch(next);
        };
        this.findAvaliacao = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+avaliacao").then(ava => {
                if (!ava) {
                    throw new restify_errors_1.NotFoundError('Sem avaliação');
                }
                else {
                    resp.json(ava.avaliacao);
                    return next();
                }
            }).catch(next);
        };
        this.replaceAvaliacao = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(ava => {
                if (!ava) {
                    throw new restify_errors_1.NotFoundError('Sem Avaliação');
                }
                else {
                    ava.fotos = req.body; // um array
                    return ava.save();
                }
            }).then(ava => {
                resp.json(ava.avaliacao);
                return next();
            }).catch(next);
        };
        this.findFotos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+fotos").then(fot => {
                if (!fot) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    resp.json(fot.fotos);
                    return next();
                }
            }).catch(next);
        };
        this.replaceFotos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(fot => {
                if (!fot) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    fot.fotos = req.body; // um array
                    return fot.save();
                }
            }).then(fot => {
                resp.json(fot.endereco);
                return next();
            }).catch(next);
        };
        this.findById = (req, resp, next) => {
            this.model.findById(req.params.id)
                .populate('Salao', 'espaco, salas, comentarios, precoHora, kit')
                .populate('Profissao', 'servico, tipo, comentario')
                .then(this.render(resp, next))
                .catch(next);
        };
    }
    /*findByPreferido = (req,resp,next)=>{ // problema de versão. Não estou conseguindo usar a rota de procurar primeiro por email
      if(req.query.preferido){
        Usuario.findByPreferido(req.query.preferido)
        .then(this.renderAll(resp, next))
        .catch(next)
      }else{
        next()
      }
    
    }*/
    applyRoutes(application) {
        application.get('/usuario', this.findAll);
        application.get('/usuario/:id', [this.validateId, this.findById]);
        application.post('/usuario', this.save);
        application.put('/usuario/:id', [this.validateId, this.replace]);
        application.patch('/usuario/:id', [this.validateId, this.update]);
        application.del('/usuario/:id', [this.validateId, this.delete]);
        application.get('/usuario/:id/contatos', [this.validateId, this.findContatos]);
        application.put('/usuario/:id/contatos', [this.validateId, this.replaceContatos]);
        application.get('/usuario/:id/endereco', [this.validateId, this.findEndereco]);
        application.put('/usuario/:id/endereco', [this.validateId, this.replaceEndereco]);
        application.get('/usuario/:id/avaliacao', [this.validateId, this.findAvaliacao]);
        application.put('/usuario/:id/avaliacao', [this.validateId, this.replaceAvaliacao]);
        application.get('/usuario/:id/fotos', [this.validateId, this.findFotos]);
        application.put('/usuario/:id/fotos', [this.validateId, this.replaceFotos]);
    }
}
exports.usuarioRouter = new UsuarioRouter();
