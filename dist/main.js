"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const usuarios_router_1 = require("./routers/usuarios.router");
const profissional_router_1 = require("./routers/profissional.router");
const salao_router_1 = require("./routers/salao.router");
const server = new server_1.Server();
server.bootstrap([usuarios_router_1.usuarioRouter, profissional_router_1.profissionalRouter, salao_router_1.salaoRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
