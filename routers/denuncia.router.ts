import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Denuncia } from '../model/denuncia.model';
import { authorize } from '../security/authz.handler';
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
        application.get('/denuncia',this.findAll)
        application.get('/denuncia/:id',[this.validateId,this.findById])
        application.post('/denuncia',/*[authorize('adimin'),/** */this.save)
        application.put('/denuncia/:id',/*[authorize('adimin'),/** */this.validateId, this.replace)
        application.patch('/denuncia/:id',/*[authorize('adimin'),/** */this.validateId, this.update)
        application.del('/denuncia/:id',/*[authorize('adimin'),/** */this.validateId, this.delete)
    }
}

export const denunciaRouter = new DenunciaRouter()