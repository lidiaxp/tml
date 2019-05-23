"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const usuario_model_1 = require("../model/usuario.model");
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
    }
    // referencia a outro model no caso do Salão e do Profissional
    // a primeira são das collections e por segundo são dos atributos
    // findById = (req,resp,next)=>{
    //   this.model.findById(req.params.id)
    //   .populate('Salao', 'espaco, salas, comentarios, precoHora, kit')
    //   .populate('Profissao', 'servico, tipo, comentario')
    //   .then(this.render(resp,next))
    //   .catch(next)
    // }
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
        //  rotas de cadastro do usuário
        application.get('/usuarios', this.findAll);
        application.get('/usuarios/:id', [this.validateId, this.findById]);
        application.post('/usuarios', this.save);
        application.put('/usuarios/:id', [this.validateId, this.replace]);
        application.patch('/usuarios/:id', [this.validateId, this.update]);
        application.del('/usuarios/:id', [this.validateId, this.delete]);
        // rotas de acesso de contatos 
        application.get('/usuario/:id/contatos', [this.validateId, this.findContatos]);
        application.put('/usuario/:id/contatos', [this.validateId, this.replaceContatos]);
        application.put('/usuarios/:id/endereco', [this.validateId, this.replaceEndereco]);
        //rotas de avaliaçao
        // rotas de acesso denuncia
        //rotas de acesso a Tarefas 
        // rotas de model de portifolios
    }
}
exports.usuarioRouter = new UsuarioRouter();
