import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Tarefa } from '../model/tarefa.model';
import{NotFoundError} from 'restify-errors';

class TarefaRouter extends ModelRouter<Tarefa>{
    constructor(){
        super(Tarefa)
      }

<<<<<<< HEAD
      

=======
      findAll = (req,resp,next)=>{
        var search = req.query.descricao;
    this.model.find({descricao: new RegExp(search)}) 
        .sort({"data": 1})
        .then(this.renderAll(resp,next))
        .catch(next)
      }
>>>>>>> 9a7b264138995fc395519eb89dfbb1944cdabda7

    applyRoutes(application: restify.Server) {
        application.get('/tarefas',this.findAll)
        application.get('/tarefas/:id',[this.validateId,this.findById])
        application.post('/tarefas',this.save)
        application.put('/tarefas/:id',[this.validateId, this.replace])
        application.patch('/tarefas/:id',[this.validateId, this.update])
        application.del('/tarefas/:id',[this.validateId, this.delete])
    }
}

export const tarefaRouter = new TarefaRouter()