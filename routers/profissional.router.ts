import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import { authorized } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors'
import{Profissional} from '../model/profissional.model'



class ProfissionalRouter extends ModelRouter<Profissional> {
  constructor(){
    super(Profissional)
  }

  findAll = (req,resp,next)=>{
    this.model.find() 
        .then(this.renderAll(resp,next))
        .catch(next)
      }

  applyRoutes(application: restify.Server){
    application.del('/profissional/:id',/** [authorized('usuario'),*/this.delete) // tem que colocar []
    // foi retirado e colocado a exclamacao do metodo validate
    application.get('/profissional',/** [authorized('usuario'),*/this.findAll)
    // método validate estava dando erro por causa do ! e o findId mudou o findById para findOne
    application.get('/profissional/:id',/** [authorized('usuario'),*/this.findById)
    application.post('/profissional',/**  [authorized('usuario'),*/this.save)
    application.put('/profissional/:id',/** [authorized('usuario'),*/this.validateId, this.replace)
    application.patch('/profissional/:id',/** [authorized('usuario'),*/this.validateId, this.update)
  }



}

export const profissionalRouter = new ProfissionalRouter()
