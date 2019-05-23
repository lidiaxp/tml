import * as restify from 'restify' // carregando o arquivo restify
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import{handlerError} from './error.handler'
import * as corsMiddleware from "restify-cors-middleware" 



export class Server{

  application: restify.Server

  initializeDb(){
    (<any>mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.url,{
      useMongoClient: true
    })
  }

  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject)=>{
      try{
        const options: restify.ServerOptions = {
          name: 'nail-hear',
          version: '1.0.0'
        }

        this.application = restify.createServer(options)

        function corsHandler(req, res, next) {
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
          
        this.application.opts('/\.*/', corsHandler, optionsRoute);

        const corsOptions: corsMiddleware.Options = {
          origins: ['*'],
          allowHeaders: ['authorization'],
          exposeHeaders: ['x-custom-header'],
         // credentials: true
          //headers: ['Access-Control-allow-Origin', 'Access-Control-allow-Methods', 'Access-Control-allow-Headers', 'Access-Control-allow-Credentials']
        }
        const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

        this.application.pre(cors.preflight)

        this.application.use(cors.actual)
        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())

        //rotas
        for(let router of routers){
          router.applyRoutes(this.application)
        }

        this.application.listen(environment.server.port,()=>{
          resolve(this.application)
        })

        this.application.on('restifyError', handlerError)

      }catch(error){
        reject(error)
      }
    })
  }
  bootstrap(routers: Router[] = []): Promise<Server>{
    return this.initializeDb().then(()=>
      this.initRoutes(routers).then(()=>this))

  }
}
