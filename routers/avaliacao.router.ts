import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Avaliacao } from '../model/avaliacao.model';
import { authorized } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';



class AvaliacaoRouter extends ModelRouter<Avaliacao>{
    constructor(){
        super(Avaliacao)
      }

      findById = (req,resp,next)=>{
        this.model.findOne({ _id: req.params.id})
        .populate('usuario','nome')
        this.prepareOne(this.model.findOne({ _id: req.params.id }))
        .then(this.render(resp,next)).catch(next)
      }

      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }



    applyRoutes(application: restify.Server) {
        application.get('/avaliacao',[authorized('usuario'),this.findAll])
        application.get('/avaliacao/:id',[authorized('usuario'),this.validateId,this.findById])
        application.post('/avaliacao',[authorized('usuario'),this.save])
        application.put('/avaliacao/:id',[authorized('usuario'),this.validateId, this.replace])
        application.patch('/avaliacao/:id',[authorized('usuario'),this.validateId, this.update])
        application.del('/avaliacao/:id',[authorized('usuario'),this.validateId, this.delete])
    }
}

export const avaliacaoRouter = new AvaliacaoRouter()