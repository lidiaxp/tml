"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify"); // carregando o arquivo restify
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const error_handler_1 = require("./error.handler");
//import * as corsMiddleware from "restify-cors-middleware";  
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
                this.application = restify.createServer({
                    name: 'nail-hear',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                //this.application.use(restify.CORS())
                this.application.opts(/.*/, function (req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
                    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
                    res.send(200);
                    return next();
                });
                /*const cors = corsMiddleware({
                  origins: ["*"],
                  allowHeaders: ["Authorization"],
                  exposeHeaders: ["Authorization"]
                });
        
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
        */
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
