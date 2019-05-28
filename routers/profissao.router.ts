import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Profissao } from '../model/profissao.model';
import{NotFoundError} from 'restify-errors';

class ProfissaoRouter extends ModelRouter<Profissao>{
    constructor(){
        super(Profissao)
      }
    applyRoutes(application: restify.Server) {
        application.get('/profissao',this.findAll)
        application.get('/profissao/:id',[this.validateId,this.findById])
        application.post('/profissao',this.save)
        application.put('/profissao/:id',[this.validateId, this.replace])
        application.patch('/profissao/:id',[this.validateId, this.update])
        application.del('/profissao/:id',[this.validateId, this.delete])
    }
}

export const profissaoRouter = new ProfissaoRouter()