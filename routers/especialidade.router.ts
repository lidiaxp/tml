import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Especialidade } from '../model/especialidade.model';
import { authorize } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';


class EspecialidadeRouter extends ModelRouter<Especialidade>{
    constructor(){
        super(Especialidade)
      }
      
      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }

    applyRoutes(application: restify.Server) {
        application.get('/especialidade',this.findAll)
        application.get('/especialidade/:id',[this.validateId,this.findById])
        application.post('/especialidade',[authorize('adimin'),this.save])
        application.put('/especialidade/:id',[authorize('adimin'),this.validateId, this.replace])
        application.patch('/especialidade/:id',[authorize('adimin'),this.validateId, this.update])
        application.del('/especialidade/:id',[authorize('adimin'),this.validateId, this.delete])
    }
}

export const especialidadeRouter = new EspecialidadeRouter()