"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify"); // carregando o arquivo restify
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const error_handler_1 = require("./error.handler");
const corsMiddleware = require("restify-cors-middleware");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    name: 'nail-hear',
                    version: '1.0.0'
                };
                this.application = restify.createServer(options);
                const corsOptions = {
                    preflightMaxAge: 86400,
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                //rotas
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handlerError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
