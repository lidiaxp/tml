import * as mongoose from 'mongoose'
import * as restify from 'restify'
import { authorized } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors'
import{ModelRouter} from '../common/model-router'
import{Salao, SalaoFranquia} from '../model/salao.model'


// Salao é do arquivo model, Salão franquia é do Interface

class SalaoRouter extends ModelRouter<SalaoFranquia>{
  constructor(){
    super(Salao)
  }

  findAll = (req,resp,next)=>{
    this.model.find() 
        .then(this.renderAll(resp,next))
        .catch(next)
      }

  applyRoutes(application: restify.Server){
    // CRUD basico
    application.get('/salao',[authorized('usuario'),this.findAll])
    application.get('/salao/:id',[authorized('usuario'),this.validateId, this.findById])
    application.post('/salao',[authorized('usuario'),this.save])
    application.put('/salao/:id',[authorized('usuario'),this.validateId, this.replace])
    application.patch('/salao/:id',[authorized('usuario'),this.validateId, this.update])
    application.del('/salao/:id',[authorized('usuario'),this.validateId, this.delete])
  }

}
export const salaoRouter = new SalaoRouter()
