"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const avaliacao_router_1 = require("./routers/avaliacao.router");
const denuncia_router_1 = require("./routers/denuncia.router");
const profissao_router_1 = require("./routers/profissao.router");
const agenda_router_1 = require("./routers/agenda.router");
const tarefa_router_1 = require("./routers/tarefa.router");
const usuarios_router_1 = require("./routers/usuarios.router");
const profissional_router_1 = require("./routers/profissional.router");
const salao_router_1 = require("./routers/salao.router");
const portfolio_router_1 = require("./routers/portfolio.router");
const server = new server_1.Server();
server.bootstrap([usuarios_router_1.usuarioRouter,
    profissional_router_1.profissionalRouter,
    salao_router_1.salaoRouter,
    avaliacao_router_1.avaliacaoRouter,
    denuncia_router_1.denunciaRouter,
    profissao_router_1.profissaoRouter,
    agenda_router_1.agendaRouter,
    tarefa_router_1.tarefaRouter,
    portfolio_router_1.portifolioRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
