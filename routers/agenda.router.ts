import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Agenda } from '../model/agenda.model';
import{NotFoundError} from 'restify-errors';

class AgendaRouter extends ModelRouter<Agenda>{
    constructor(){
        super(Agenda)
      }

      findAll = (req,resp,next)=>{
    this.model.find() 
        .then(this.renderAll(resp,next))
        .catch(next)
      }

    applyRoutes(application: restify.Server) {
        application.get('/agenda',this.findAll)
        application.get('/agenda/:id',[this.validateId,this.findById])
        application.post('/agenda',this.save)
        application.put('/agenda/:id',[this.validateId, this.replace])
        application.patch('/agenda/:id',[this.validateId, this.update])
        application.del('/agenda/:id',[this.validateId, this.delete])
    }
}

export const agendaRouter = new AgendaRouter()
