"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const usuario_model_1 = require("../model/usuario.model");
const auth_handler_1 = require("../security/auth.handler");
const restify_errors_1 = require("restify-errors");
class UsuarioRouter extends model_router_1.ModelRouter {
    constructor() {
        super(usuario_model_1.Usuario);
        // rota de encontrar contatos 
        this.findContatos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+contatos").then(cont => {
                if (!cont) {
                    throw new restify_errors_1.NotFoundError('Contato não encontrado');
                }
                else {
                    resp.json(cont.contatos);
                    return next();
                }
            }).catch(next);
        };
        // rota de atualizar dados de contatos 
        this.replaceContatos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Contato não encontrado');
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
        // rota de adicionar endereços
        // rota de atualizar endereços
        this.replaceEndereco = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(usu => {
                if (!usu) {
                    throw new restify_errors_1.NotFoundError('Endereço não encontrado');
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
        // rota de encontrar fotos já adicionadas
        this.findFotos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id, "+fotos").then(fot => {
                if (!fot) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    resp.json(fot.fotoPerfil);
                    return next();
                }
            }).catch(next);
        };
        // rota de atualizar as fotos 
        this.replaceFotos = (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id).then(fot => {
                if (!fot) {
                    throw new restify_errors_1.NotFoundError('Usuario não encontrado');
                }
                else {
                    fot.fotoPerfil = req.body; // um array
                    return fot.save();
                }
            }).then(fot => {
                resp.json(fot.endereco);
                return next();
            }).catch(next);
        };
        // referencia a outro model no caso do Salão e do Profissional
        // a primeira são das collections e por segundo são dos atributos
        // findById = (req,resp,next)=>{
        //   this.model.findById(req.params.id)
        //   .populate('Salao', 'espaco, salas, comentarios, precoHora, kit')
        //   .populate('Profissao', 'servico, tipo, comentario')
        //   .then(this.render(resp,next))
        //   .catch(next)
        // }
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                usuario_model_1.Usuario.find(req.query.email)
                    .then(usuario => {
                    if (usuario) {
                        return [usuario];
                    }
                    else {
                        [];
                    }
                })
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
        this.on('beforeRender', document => {
            document.senha = undefined;
        });
    }
    applyRoutes(application) {
        //  rotas de cadastro do usuário
        application.get({ path: '/usuarios' }, /** [authorized('usuario'),*/ this.findByEmail, this.findAll); // depois coloque o []
        application.get('/usuarios/:id', /** [authorized('usuario'),*/ this.validateId, this.findById);
        application.post('/usuarios', this.save);
        application.put('/usuarios/:id', /** [authorized('usuario'),*/ this.validateId, this.replace);
        application.patch('/usuarios/:id', /** [authorized('usuario'),*/ this.validateId, this.update);
        application.del('/usuarios/:id', /*[authorized('usuario'),*/ this.validateId, this.delete);
        application.post('/usuarios/authenticate', auth_handler_1.authenticate);
    }
}
exports.usuarioRouter = new UsuarioRouter();
