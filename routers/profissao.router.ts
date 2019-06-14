import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Profissao } from '../model/profissao.model';
import { authorized } from '../security/authz.handler';
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
        application.get('/profissao',/** [authorized('usuario'),*/this.findAll)
        application.get('/profissao/:id',/** [authorized('usuario'),*/this.validateId,this.findById)
        application.post('/profissao',/** [authorized('usuario'),*/this.save)
        application.put('/profissao/:id',/** [authorized('usuario'),*/this.validateId, this.replace)
        application.patch('/profissao/:id',/** [authorized('usuario'),*/this.validateId, this.update)
        application.del('/profissao/:id',/** [authorized('usuario'),*/this.validateId, this.delete)
    }
}

export const profissaoRouter = new ProfissaoRouter()