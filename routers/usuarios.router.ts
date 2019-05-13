import * as mongoose from 'mongoose'
import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{Usuario} from '../model/usuario.model'

class UsuarioRouter extends ModelRouter<Usuario> {

  constructor(){
    super(Usuario)
  }



  






  findContatos = (req,resp,next)=>{
    Usuario.findById(req.params.id, "+contatos").then(cont=>{
      if(!cont){
        throw new NotFoundError('Usuario não encontrado')
      }else{
        resp.json(cont.contatos)
        return next()
      }
    }).catch(next)
  }
  replaceContatos = (req,resp,next)=>{
  Usuario.findById(req.params.id).then(rest=>{
    if(!rest){
      throw new NotFoundError('Usuario não encontrado')
    }else{
      rest.contatos = req.body // um array
      return rest.save()
    }
  }).then(rest=>{
    resp.json(rest.contatos)
    return next()
  }).catch(next)
}

findEndereco = (req,resp,next)=>{
  Usuario.findById(req.params.id, "+endereco").then(cont=>{
    if(!cont){
      throw new NotFoundError('Usuario não encontrado')
    }else{
      resp.json(cont.endereco)
      return next()
    }
  }).catch(next)
}
replaceEndereco = (req,resp,next)=>{
Usuario.findById(req.params.id).then(usu=>{
  if(!usu){
    throw new NotFoundError('Usuario não encontrado')
  }else{
    usu.endereco = req.body // um array
    return usu.save()
  }
}).then(usu=>{
  resp.json(usu.endereco)
  return next()
}).catch(next)
}

findAvaliacao = (req,resp,next)=>{
  Usuario.findById(req.params.id, "+avaliacao").then(ava=>{
    if(!ava){
      throw new NotFoundError('Sem avaliação')
    }else{
      resp.json(ava.avaliacao)
      return next()
    }
  }).catch(next)
}
replaceAvaliacao = (req,resp,next)=>{
Usuario.findById(req.params.id).then(ava=>{
  if(!ava){
    throw new NotFoundError('Sem Avaliação')
  }else{
    ava.fotos = req.body // um array
    return ava.save()
  }
}).then(ava=>{
  resp.json(ava.avaliacao)
  return next()
}).catch(next)
}

findFotos = (req,resp,next)=>{
  Usuario.findById(req.params.id, "+fotos").then(fot=>{
    if(!fot){
      throw new NotFoundError('Usuario não encontrado')
    }else{
      resp.json(fot.fotos)
      return next()
    }
  }).catch(next)
}
replaceFotos = (req,resp,next)=>{
Usuario.findById(req.params.id).then(fot=>{
  if(!fot){
    throw new NotFoundError('Usuario não encontrado')
  }else{
    fot.fotos = req.body // um array
    return fot.save()
  }
}).then(fot=>{
  resp.json(fot.endereco)
  return next()
}).catch(next)
}

findById = (req,resp,next)=>{
  this.model.findById(req.params.id)
  .populate('Salao', 'espaco, salas, comentarios, precoHora, kit')
  .populate('Profissao', 'servico, tipo, comentario')
  .then(this.render(resp,next))
  .catch(next)
}

/*findByPreferido = (req,resp,next)=>{ // problema de versão. Não estou conseguindo usar a rota de procurar primeiro por email
  if(req.query.preferido){
    Usuario.findByPreferido(req.query.preferido)
    .then(this.renderAll(resp, next))
    .catch(next)
  }else{
    next()
  }

}*/



  applyRoutes(application: restify.Server){

    
   
    application.get('/usuario',this.findAll)
    application.get('/usuario/:id',[this.validateId, this.findById])
    application.post('/usuario', this.save)
    application.put('/usuario/:id',[this.validateId, this.replace])
    application.patch('/usuario/:id',[this.validateId, this.update])
    application.del('/usuario/:id',[this.validateId, this.delete])

    application.get('/usuario/:id/contatos', [this.validateId, this.findContatos])
    application.put('/usuario/:id/contatos', [this.validateId, this.replaceContatos])

    application.get('/usuario/:id/endereco',[this.validateId,  this.findEndereco])
    application.put('/usuario/:id/endereco', [this.validateId, this.replaceEndereco])

    application.get('/usuario/:id/avaliacao',[this.validateId,  this.findAvaliacao])
    application.put('/usuario/:id/avaliacao', [this.validateId, this.replaceAvaliacao])

    application.get('/usuario/:id/fotos', [this.validateId, this.findFotos])
    application.put('/usuario/:id/fotos', [this.validateId, this.replaceFotos])

    



  }
}

export const usuarioRouter = new UsuarioRouter()
