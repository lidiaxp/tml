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

        const corsOptions: corsMiddleware.Options = {
          preflightMaxAge: 86400,
          origins: ['*'],
          allowHeaders: ['authorization'],
          exposeHeaders: ['x-custom-header']
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
