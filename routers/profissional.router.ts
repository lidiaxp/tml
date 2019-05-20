import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{Profissional} from '../model/profissional.model'

class ProfissionalRouter extends ModelRouter<Profissional> {
  constructor(){
    super(Profissional)
  }

  applyRoutes(application: restify.Server){
    application.del('/profissional/:id',this.delete)
    // foi retirado e colocado a exclamacao do metodo validate
    application.get('/profissional',this.findAll)
    // método validate estava dando erro por causa do ! e o findId mudou o findById para findOne
    application.get('/profissional/:id',[this.validateId, this.findById])
    application.post('/profissional', this.save)
    application.put('/profissional/:id',[this.validateId, this.replace])
    application.patch('/profissional/:id',[this.validateId, this.update])
  }



}

export const profissionalRouter = new ProfissionalRouter()
