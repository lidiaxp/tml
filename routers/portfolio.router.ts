import * as mongoose from 'mongoose';
import{ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import { Portfolio } from '../model/portfolio.model';
import { authorized } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors';


class PortifolioRouter extends ModelRouter<Portfolio>{
    constructor(){
        super(Portfolio)
      }

      findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }


    applyRoutes(application: restify.Server) {
        application.get('/portfolio',/** [authorized('usuario'),*/this.findAll)
        application.get('/portfolio/:id',/** [this.validateId,*/this.findById)
        application.post('/portfolio',/** [authorized('usuario'),*/this.save)
        application.put('/portfolio/:id',/** [authorized('usuario'),*/this.validateId, this.replace)
        application.patch('/portfolio/:id',/** [authorized('usuario'),*/this.update)
        application.del('/portfolio/:id',/** [authorized('usuario'),*/this.validateId, this.delete)
    }
}

export const portifolioRouter = new PortifolioRouter()