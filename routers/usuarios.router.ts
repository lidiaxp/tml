import * as mongoose from 'mongoose'
import{ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import { Usuario } from '../model/usuario.model';
import { autenticacao } from '../security/autenticador.handler';
import { authorize } from '../security/authz.handler';
import{NotFoundError} from 'restify-errors'




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
findByEmail = (req,resp,next)=>{
  if(req.query.email){
    Usuario.find(req.query.email)

      .then(usuario => {
        if(usuario){
          return [usuario]
        }else{
          []
        }
      } )
      .then(this.renderAll(resp,next))
    .catch(next)
  }else{
    next()
  }
}


  findAll = (req,resp,next)=>{
    this.model.find() 
        .then(this.renderAll(resp,next))
        .catch(next)
      }

  applyRoutes(application: restify.Server){
    //  rotas de cadastro do usuário
    application.get({path:'/usuarios', version:'2.0.0'},[authorize('adimin'),this.findByEmail,this.findAll])
    application.get('/usuarios/:id',[authorize('adimin'),this.validateId, this.findById])
    application.post('/usuarios',[authorize('adimin'), this.save])
    application.put('/usuarios/:id',[authorize('adimin'),this.validateId, this.replace])
    application.patch('/usuarios/:id',[authorize('adimin'),this.validateId, this.update])
    application.del('/usuarios/:id',[authorize('adimin'),this.validateId, this.delete])
    
    application.post('/usuario/autenticacao',autenticacao)
  }
}

export const usuarioRouter = new UsuarioRouter()
