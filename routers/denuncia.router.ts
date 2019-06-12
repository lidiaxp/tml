import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Denuncia } from '../model/denuncia.model';
import { authorized } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';


class DenunciaRouter extends ModelRouter<Denuncia>{
    constructor(){
        super(Denuncia)
      }
      
      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }

    applyRoutes(application: restify.Server) {
        application.get('/denuncia',[authorized('usuario'),this.findAll])
        application.get('/denuncia/:id',[authorized('usuario'),this.validateId,this.findById])
        application.post('/denuncia',[authorized('usuario'),this.save])
        application.put('/denuncia/:id',[authorized('usuario'),this.validateId, this.replace])
        application.patch('/denuncia/:id',[authorized('usuario'),this.validateId, this.update])
        application.del('/denuncia/:id',[authorized('usuario'),this.validateId, this.delete])
    }
}

export const denunciaRouter = new DenunciaRouter()