"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify"); // carregando o arquivo restify
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const error_handler_1 = require("./error.handler");
const corsMiddleware = require("restify-cors-middleware");
const token_parser_1 = require("../security/token.parser");
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
                /*function corsHandler(req, res, next) {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
                  res.setHeader('Access-Control-Allow-Methods', '*');
                  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
                  res.setHeader('Access-Control-Max-Age', '1000');
                  return next();
                }
        
                function optionsRoute(req, res, next) {
                  res.send(200);
                  return next();
                }
        
                this.application.use(restify.CORS({
                  credentials: true,                 // defaults to false
                  methods: ['GET','PUT','DELETE','POST','OPTIONS']
                }));
                  
                this.application.opts('/\./', corsHandler, optionsRoute);*/
                const corsOptions = {
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                    //credentials: true
                    //headers: ['Access-Control-allow-Origin', 'Access-Control-allow-Methods', 'Access-Control-allow-Headers', 'Access-Control-allow-Credentials']
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(token_parser_1.tokenParser);
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
