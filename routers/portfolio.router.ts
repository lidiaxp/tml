import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Portfolio } from '../model/portfolio.model';
import{NotFoundError} from 'restify-errors';

class ProfissaoRouter extends ModelRouter<Portfolio>{
    constructor(){
        super(Portfolio)
      }
    applyRoutes(application: restify.Server) {
        application.get('/portfolio',this.findAll)
        application.get('/portfolio/:id',[this.validateId,this.findById])
        application.post('/portfolio',this.save)
        application.put('/portfolio/:id',[this.validateId, this.replace])
        application.patch('/portfolio/:id',[this.validateId, this.update])
        application.del('/portfolio/:id',[this.validateId, this.delete])
    }
}

export const profissaoRouter = new ProfissaoRouter()