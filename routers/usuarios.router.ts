import * as mongoose from 'mongoose'
import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{Usuario} from '../model/usuario.model'

class UsuarioRouter extends ModelRouter<Usuario> {

  constructor(){
    super(Usuario)
  }

  findAll = (req,resp,next)=>{
    this.model.find() 
        .then(this.renderAll(resp,next))
        .catch(next)
      }

  applyRoutes(application: restify.Server){
    //  rotas de cadastro do usuário
    application.get('/usuarios',this.findAll)
    application.get('/usuarios/:id',[this.validateId, this.findById])
    application.post('/usuarios', this.save)
    application.put('/usuarios/:id',[this.validateId, this.replace])
    application.patch('/usuarios/:id',[this.validateId, this.update])
    application.del('/usuarios/:id',[this.validateId, this.delete])
  }
}

export const usuarioRouter = new UsuarioRouter()
