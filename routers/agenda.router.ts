import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Agenda } from '../model/agenda.model';
import { authorized } from '../security/authz.handler';
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
        application.get('/agenda',/** [authorized('usuario'),*/this.findAll)
        application.get('/agenda/:id',/** [authorized('usuario'),*/this.validateId,this.findById)
        application.post('/agenda',/** [authorized('usuario'),*/this.save)
        application.put('/agenda/:id',/** [authorized('usuario'),*/this.validateId, this.replace)
        application.patch('/agenda/:id',/** [authorized('usuario'),*/this.validateId, this.update)
        application.del('/agenda/:id',/** [authorized('usuario'),*/this.validateId, this.delete)
    }
}

export const agendaRouter = new AgendaRouter()
