import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Tarefa } from '../model/tarefa.model';
import { authorize } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';


class TarefaRouter extends ModelRouter<Tarefa>{
    constructor(){
        super(Tarefa)
      }

      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }
      


    applyRoutes(application: restify.Server) {
        application.get('/tarefas',this.findAll)
        application.get('/tarefas/:id',[this.validateId,this.findById])
        application.post('/tarefas',/*[authorize('usuario')/** */this.save)
        application.put('/tarefas/:id',/*[authorize('usuario'),/** */this.validateId, this.replace)
        application.patch('/tarefas/:id',/*[authorize('usuario'),/** */this.validateId, this.update)
        application.del('/tarefas/:id',/*[authorize('usuario')/** */this.validateId, this.delete)
    }
}

export const tarefaRouter = new TarefaRouter()