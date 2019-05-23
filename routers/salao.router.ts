import * as mongoose from 'mongoose'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{ModelRouter} from '../common/model-router'
<<<<<<< HEAD
import{Salao, SalaoFranquia} from '../model/salao.model'

// Salao é do arquivo model, Salão franquia é do Interface

=======
import{SalaoFranquia, Salao} from '../model/salao.model'

>>>>>>> ffa502b02f84cdbf8c89d91744b3ac7c4eafa6ba
class SalaoRouter extends ModelRouter<SalaoFranquia>{
  constructor(){
    super(Salao)
  }

  findDono = (req,resp,next)=>{
    Salao.findById(req.params.id, "+dono").then(salao=>{
      if(!salao){
        throw new NotFoundError('Dono não encontrado')
      }else{
        resp.json(salao.dono)
        return next()
      }
    }).catch(next)
  }

  replaceDono = (req,resp,next)=>{
    Salao.findById(req.params.id).then(salao=>{
      if(!salao){
        throw new NotFoundError('Dono não encontrado')
      }else{
        salao.kit = req.body 
        return salao.save()
      }
    }).then(salao=>{
      resp.json(salao.dono)
      return next()
    }).catch(next)
  }
  
  findKit = (req,resp,next)=>{
      Salao.findById(req.params.id, "+kit").then(salao=>{
        if(!salao){
          throw new NotFoundError('Kit não encontrado')
        }else{
          resp.json(salao.kit)
          return next()
        }
      }).catch(next)
    }

    replaceKit = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('Kit não encontrado')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.kit)
        return next()
      }).catch(next)
    }

    insereKit = (req, resp, next)=>{
      Salao.create(req.params.id, "+kit").then(salao=>{
        let document = new this.model(req.body)
        document.save().then(this.render(resp,next)).catch(next)  
      })
    }

    findEnderecoFranquia = (req,resp,next)=>{
      Salao.findById(req.params.id, "+endereco").then(salao=>{
        if(!salao){
          throw new NotFoundError('Endereço do salão não encontrado')
        }else{
          resp.json(salao.enderecoFranquias)
          return next()
        }
      }).catch(next)
    }

    replaceEnderecoFranquia = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('Endereço do salão não encontrado')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.enderecoFranquias)
        return next()
      }).catch(next)
    }

    findDadosCartao = (req,resp,next)=>{
      Salao.findById(req.params.id, "+dadoscartao").then(salao=>{
        if(!salao){
          throw new NotFoundError('Dados do cartão não encontrados')
        }else{
          resp.json(salao.dadosCartao)
          return next()
        }
      }).catch(next)
    }

    replaceDadosCartao = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('Dados do catão não encontrados')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.dadosCartao)
        return next()
      }).catch(next)
    }

    findBancas = (req,resp,next)=>{
      Salao.findById(req.params.id, "+bancas").then(salao=>{
        if(!salao){
          throw new NotFoundError('Banca não encontrada')
        }else{
          resp.json(salao.bancas)
          return next()
        }
      }).catch(next)
    }

    replaceBancas = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('Banca não encontrada')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.bancas)
        return next()
      }).catch(next)
    }

    findProfissionalPreferido = (req,resp,next)=>{
      Salao.findById(req.params.id, "+profissionalpreferido").then(salao=>{
        if(!salao){
          throw new NotFoundError('Profissional preferido não encontrado')
        }else{
          resp.json(salao.preferido)
          return next()
        }
      }).catch(next)
    }

    replaceProfissioanalPreferido = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('Profissional preferido não encontrado')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.preferido)
        return next()
      }).catch(next)
    }

    findHistorico = (req,resp,next)=>{
      Salao.findById(req.params.id, "+historicosalao").then(salao=>{
        if(!salao){
          throw new NotFoundError('restaurante não encontrado')
        }else{
          resp.json(salao.historicoSalao)
          return next()
        }
      }).catch(next)
    }

    replaceHistorico = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('restaurante não encontrado')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.historicoSalao)
        return next()
      }).catch(next)
    }

  applyRoutes(application: restify.Server){
    // CRUD basico
    application.get('/salao',this.findAll)
    application.get('/salao/:id',[this.validateId, this.findById])
    application.post('/salao', this.save)
    application.put('/salao/:id',[this.validateId, this.replace])
    application.patch('/salao/:id',[this.validateId, this.update])
    application.del('/salao/:id',[this.validateId, this.delete])

    // rotas para atualizar o dono/usuario
    application.get('/salao/:id/dono',[this.validateId, this.findDono])
    application.put('/salao/:id/dono/:id',[this.validateId, this.replaceDono])
    application.del('/salao/:id/dono/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/dono/:id',[this.validateId, this.update])
    application.post('/salao/:id/dono', this.save)
    
    // rotas para atualizar o kit
    application.get('/salao/:id/kit',[this.validateId, this.findKit])
    application.put('/salao/:id/kit/:id',[this.validateId, this.replaceKit])
    application.del('/salao/:id/kit/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/kit/:id',[this.validateId, this.update])
    application.post('/salao/:id/kit', this.save)
    
    // rotas para atualizar o endereco franquia
    application.get('/salao/:id/endereco',[this.validateId, this.findEnderecoFranquia])
    application.put('/salao/:id/endereco/:id',[this.validateId, this.replaceEnderecoFranquia])
    application.del('/salao/:id/endereco/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/endereco/:id',[this.validateId, this.update])

    // rotas para atualizar os dados do cartao
    application.get('/salao/:id/dadoscartao',[this.validateId, this.findDadosCartao])
    application.put('/salao/:id/dadoscartao/:id',[this.validateId, this.replaceDadosCartao])
    application.del('/salao/:id/dadoscartao/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/dadoscartao/:id',[this.validateId, this.update])

    // rotas para atualizar as bancas
    application.get('/salao/:id/bancas',[this.validateId, this.findBancas])
    application.put('/salao/:id/bancas/:id',[this.validateId, this.replaceBancas])
    application.del('/salao/:id/bancas/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/bancas/:id',[this.validateId, this.update])

    // rotas para atualizar o profissional preferido
    application.get('/salao/:id/profissionalpreferido',[this.validateId, this.findProfissionalPreferido])
    application.put('/salao/:id/profissionalpreferido/:id',[this.validateId, this.replaceProfissioanalPreferido])
    application.del('/salao/:id/profissionalpreferido/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/profissionalpreferido/:id',[this.validateId, this.update])

    // rotas para atualizar o historico do salao
    application.get('/salao/:id/historicosalao',[this.validateId, this.findHistorico])
    application.put('/salao/:id/historicosalao/:id',[this.validateId, this.replaceHistorico])
    application.del('/salao/:id/historicosalao/:id',[this.validateId, this.delete])
    application.patch('/salao/:id/historicosalao/:id',[this.validateId, this.update])
  }

}
export const salaoRouter = new SalaoRouter()
