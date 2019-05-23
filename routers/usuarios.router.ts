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

<<<<<<< HEAD
// rota de encontrar fotos já adicionadas
=======
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
    ava.fotoPerfil = req.body // um array
    return ava.save()
  }
}).then(ava=>{
  resp.json(ava.avaliacao)
  return next()
}).catch(next)
}

>>>>>>> ffa502b02f84cdbf8c89d91744b3ac7c4eafa6ba
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
    application.get('/usuario',this.findAll)
    application.get('/usuario/:id',[this.validateId, this.findById])
    application.post('/usuario', this.save)
    application.put('/usuario/:id',[this.validateId, this.replace])
    application.patch('/usuario/:id',[this.validateId, this.update])
    application.del('/usuario/:id',[this.validateId, this.delete])
    
    // rotas de acesso de contatos 
    application.get('/usuario/:id/contatos', [this.validateId, this.findContatos])
    application.post('/usuario/:id/contatos', [this.validateId, this.save])
    application.put('/usuario/:id/contatos', [this.validateId, this.replaceContatos])
   
    // rotas de acesso ao endereço

    application.put('/usuario/:id/endereco', [this.validateId, this.replaceEndereco])


   
    //rotas de avaliaçao
    

    // rotas de acesso denuncia


    //rotas de acesso a Tarefas 


    // rotas de model de portifolios






   


  }
}

export const usuarioRouter = new UsuarioRouter()
