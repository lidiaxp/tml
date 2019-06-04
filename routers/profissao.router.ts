import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Profissao } from '../model/profissao.model';
import { authorize } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';


class ProfissaoRouter extends ModelRouter<Profissao>{
    constructor(){
        super(Profissao)
      }
      
      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }

    applyRoutes(application: restify.Server) {
        application.get('/profissao',this.findAll)
        application.get('/profissao/:id',[this.validateId,this.findById])
        application.post('/profissao',[authorize('adimin'),this.save])
        application.put('/profissao/:id',[authorize('adimin'),this.validateId, this.replace])
        application.patch('/profissao/:id',[authorize('adimin'),this.validateId, this.update])
        application.del('/profissao/:id',[authorize('adimin'),this.validateId, this.delete])
    }
}

export const profissaoRouter = new ProfissaoRouter()