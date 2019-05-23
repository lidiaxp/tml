"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
const salao_model_1 = require("../model/salao.model");
class SalaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(salao_model_1.Salao);
        this.findKit = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+kit").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Kit não encontrado');
                }
                else {
                    resp.json(salao.kit);
                    return next();
                }
            }).catch(next);
        };
        this.replaceKit = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Kit não encontrado');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.kit);
                return next();
            }).catch(next);
        };
        this.insereKit = (req, resp, next) => {
            let document = new this.model(req.body);
        };
        this.findEnderecoFranquia = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+endereco").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Endereço do salão não encontrado');
                }
                else {
                    resp.json(salao.enderecoFranquias);
                    return next();
                }
            }).catch(next);
        };
        this.replaceEnderecoFranquia = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Endereço do salão não encontrado');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.enderecoFranquias);
                return next();
            }).catch(next);
        };
        this.findDadosCartao = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+dadoscartao").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Dados do cartão não encontrados');
                }
                else {
                    resp.json(salao.dadosCartao);
                    return next();
                }
            }).catch(next);
        };
        this.replaceDadosCartao = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Dados do catão não encontrados');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.dadosCartao);
                return next();
            }).catch(next);
        };
        this.findBancas = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+bancas").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Banca não encontrada');
                }
                else {
                    resp.json(salao.bancas);
                    return next();
                }
            }).catch(next);
        };
        this.replaceBancas = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Banca não encontrada');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.bancas);
                return next();
            }).catch(next);
        };
        this.findProfissionalPreferido = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+profissionalpreferido").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Profissional preferido não encontrado');
                }
                else {
                    resp.json(salao.preferido);
                    return next();
                }
            }).catch(next);
        };
        this.replaceProfissioanalPreferido = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('Profissional preferido não encontrado');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.preferido);
                return next();
            }).catch(next);
        };
        this.findHistorico = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id, "+historicosalao").then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('restaurante não encontrado');
                }
                else {
                    resp.json(salao.historicoSalao);
                    return next();
                }
            }).catch(next);
        };
        this.replaceHistorico = (req, resp, next) => {
            salao_model_1.Salao.findById(req.params.id).then(salao => {
                if (!salao) {
                    throw new restify_errors_1.NotFoundError('restaurante não encontrado');
                }
                else {
                    salao.kit = req.body; // um array
                    return salao.save();
                }
            }).then(salao => {
                resp.json(salao.historicoSalao);
                return next();
            }).catch(next);
        };
    }
    applyRoutes(application) {
        // CRUD basico
        application.get('/salao', this.findAll);
        application.get('/salao/:id', [this.validateId, this.findById]);
        application.post('/salao', this.save);
        application.put('/salao/:id', [this.validateId, this.replace]);
        application.patch('/salao/:id', [this.validateId, this.update]);
        application.del('/salao/:id', [this.validateId, this.delete]);
        // rotas para atualizar o kit
        application.get('/salao/:id/kit', [this.validateId, this.findKit]);
        application.put('/salao/:id/kit/:id', [this.validateId, this.replaceKit]);
        application.del('/salao/:id/kit/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/kit/:id', [this.validateId, this.update]);
        application.post('/salao/:id/kit', this.save);
        // rotas para atualizar o endereco franquia
        application.get('/salao/:id/endereco', [this.validateId, this.findEnderecoFranquia]);
        application.put('/salao/:id/endereco/:id', [this.validateId, this.replaceEnderecoFranquia]);
        application.del('/salao/:id/endereco/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/endereco/:id', [this.validateId, this.update]);
        // rotas para atualizar os dados do cartao
        application.get('/salao/:id/dadoscartao', [this.validateId, this.findDadosCartao]);
        application.put('/salao/:id/dadoscartao/:id', [this.validateId, this.replaceDadosCartao]);
        application.del('/salao/:id/dadoscartao/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/dadoscartao/:id', [this.validateId, this.update]);
        // rotas para atualizar as bancas
        application.get('/salao/:id/bancas', [this.validateId, this.findBancas]);
        application.put('/salao/:id/bancas/:id', [this.validateId, this.replaceBancas]);
        application.del('/salao/:id/bancas/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/bancas/:id', [this.validateId, this.update]);
        // rotas para atualizar o profissional preferido
        application.get('/salao/:id/profissionalpreferido', [this.validateId, this.findProfissionalPreferido]);
        application.put('/salao/:id/profissionalpreferido/:id', [this.validateId, this.replaceProfissioanalPreferido]);
        application.del('/salao/:id/profissionalpreferido/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/profissionalpreferido/:id', [this.validateId, this.update]);
        // rotas para atualizar o historico do salao
        application.get('/salao/:id/historicosalao', [this.validateId, this.findHistorico]);
        application.put('/salao/:id/historicosalao/:id', [this.validateId, this.replaceHistorico]);
        application.del('/salao/:id/historicosalao/:id', [this.validateId, this.delete]);
        application.patch('/salao/:id/historicosalao/:id', [this.validateId, this.update]);
    }
}
exports.salaoRouter = new SalaoRouter();
