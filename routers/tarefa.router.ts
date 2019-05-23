import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Tarefa } from '../model/tarefa.model';
import{NotFoundError} from 'restify-errors';

class TarefaRouter extends ModelRouter<Tarefa>{
    applyRoutes(application: restify.Server) {
        application.get('/tarefas',this.findAll)
        application.get('/tarefas/:id',[this.validateId,this.findById])
        application.post('/tarefas',this.save)
        application.put('/tarefas/:id',[this.validateId, this.replace])
        
    }
    
}