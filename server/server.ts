import * as restify from 'restify' // carregando o arquivo restify
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import{handlerError} from './error.handler'
//import * as corsMiddleware from "restify-cors-middleware";  



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

        this.application = restify.createServer({
          name:'nail-hear',
          version:'1.0.0'
        })

        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())
        /*this.application.use(restify.CORS())

        this.application.opts(/./, function (req,res,next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
          res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
          res.send(200);
          return next();
      });

        const cors = corsMiddleware({  
          origins: ["*"],
          allowHeaders: ["Authorization"],
          exposeHeaders: ["Authorization"]
        });

        this.application.pre(cors.preflight);  
        this.application.use(cors.actual);  
*/
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
