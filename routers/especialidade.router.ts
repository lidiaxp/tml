import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Especialidade } from '../model/especialidade.model';
import{NotFoundError} from 'restify-errors';

class EspecialidadeRouter extends ModelRouter<Especialidade>{
    constructor(){
        super(Especialidade)
      }
    applyRoutes(application: restify.Server) {
        application.get('/especialidade',this.findAll)
        application.get('/especialidade/:id',[this.validateId,this.findById])
        application.post('/especialidade',this.save)
        application.put('/especialidade/:id',[this.validateId, this.replace])
        application.patch('/especialidade/:id',[this.validateId, this.update])
        application.del('/especialidade/:id',[this.validateId, this.delete])
    }
}

export const especialidadeRouter = new EspecialidadeRouter()