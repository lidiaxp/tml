import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Denuncia } from '../model/denuncia.model';
import{NotFoundError} from 'restify-errors';

class DenunciaRouter extends ModelRouter<Denuncia>{
    constructor(){
        super(Denuncia)
      }
    applyRoutes(application: restify.Server) {
        application.get('/denuncia',this.findAll)
        application.get('/denuncia/:id',[this.validateId,this.findById])
        application.post('/denuncia',this.save)
        application.put('/denuncia/:id',[this.validateId, this.replace])
        application.patch('/denuncia/:id',[this.validateId, this.update])
        application.del('/denuncia/:id',[this.validateId, this.delete])
    }
}

export const denunciaRouter = new DenunciaRouter()