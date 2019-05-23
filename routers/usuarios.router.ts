import * as mongoose from 'mongoose'
import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{Usuario} from '../model/usuario.model'

class UsuarioRouter extends ModelRouter<Usuario> {

  constructor(){
    super(Usuario)
  }
   // rota de encontrar contatos 
  findContatos = (req,resp,next)=>{
    Usuario.findById(req.params.id, "+contatos").then(cont=>{
      if(!cont){
        throw new NotFoundError('Contato não encontrado')
      }else{
        resp.json(cont.contatos)
        return next()
      }
    }).catch(next)
  }
  // rota de atualizar dados de contatos 
  replaceContatos = (req,resp,next)=>{
  Usuario.findById(req.params.id).then(rest=>{
    if(!rest){
      throw new NotFoundError('Contato não encontrado')
    }else{
      rest.contatos = req.body // um array
      return rest.save()
    }
  }).then(rest=>{
    resp.json(rest.contatos)
    return next()
  }).catch(next)
}
// rota de adicionar endereços



// rota de atualizar endereços
replaceEndereco = (req,resp,next)=>{
Usuario.findById(req.params.id).then(usu=>{
  if(!usu){
    throw new NotFoundError('Endereço não encontrado')
  }else{
    usu.endereco = req.body // um array
    return usu.save()
  }
}).then(usu=>{
  resp.json(usu.endereco)
  return next()
}).catch(next)
}

// rota de encontrar fotos já adicionadas
findFotos = (req,resp,next)=>{
  Usuario.findById(req.params.id, "+fotos").then(fot=>{
    if(!fot){
      throw new NotFoundError('Usuario não encontrado')
    }else{
      resp.json(fot.fotoPerfil)
      return next()
    }
  }).catch(next)
}


// rota de atualizar as fotos 
replaceFotos = (req,resp,next)=>{
Usuario.findById(req.params.id).then(fot=>{
  if(!fot){
    throw new NotFoundError('Usuario não encontrado')
  }else{
    fot.fotoPerfil = req.body // um array
    return fot.save()
  }
}).then(fot=>{
  resp.json(fot.endereco)
  return next()
}).catch(next)
}





// referencia a outro model no caso do Salão e do Profissional
// a primeira são das collections e por segundo são dos atributos
// findById = (req,resp,next)=>{
//   this.model.findById(req.params.id)
//   .populate('Salao', 'espaco, salas, comentarios, precoHora, kit')
//   .populate('Profissao', 'servico, tipo, comentario')
//   .then(this.render(resp,next))
//   .catch(next)
// }





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
    //  rotas de cadastro do usuário
    application.get('/usuarios',this.findAll)
    application.get('/usuarios/:id',[this.validateId, this.findById])
    application.post('/usuarios', this.save)
    application.put('/usuarios/:id',[this.validateId, this.replace])
    application.patch('/usuarios/:id',[this.validateId, this.update])
    application.del('/usuarios/:id',[this.validateId, this.delete])
    
    // rotas de acesso de contatos 
<<<<<<< HEAD
    application.get('/usuario/:id/contatos', [this.validateId, this.findContatos])
    
    application.put('/usuario/:id/contatos', [this.validateId, this.replaceContatos])
=======
    application.get('/usuarios/:id/contatos', [this.validateId, this.findContatos])
    application.post('/usuarios/:id/contatos', [this.validateId, this.save])
    application.put('/usuarios/:id/contatos', [this.validateId, this.replaceContatos])
>>>>>>> c420889a9f4bb368f4d489400cf9cca436ebc9b3
   
    // rotas de acesso ao endereço

    application.put('/usuarios/:id/endereco', [this.validateId, this.replaceEndereco])


   
    //rotas de avaliaçao
    

    // rotas de acesso denuncia


    //rotas de acesso a Tarefas 


    // rotas de model de portifolios






   


  }
}

export const usuarioRouter = new UsuarioRouter()
