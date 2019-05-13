import * as mongoose from 'mongoose'
import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{ModelRouter} from '../common/model-router'
import{Salao} from '../model/salao.model'

class SalaoRouter extends ModelRouter<Salao>{
  constructor(){
    super(Salao)
  }


  findKit = (req,resp,next)=>{
      Salao.findById(req.params.id, "+kit").then(salao=>{
        if(!salao){
          throw new NotFoundError('restaurante não encontrado')
        }else{
          resp.json(salao.kit)
          return next()
        }
      }).catch(next)
    }
    replaceKit = (req,resp,next)=>{
      Salao.findById(req.params.id).then(salao=>{
        if(!salao){
          throw new NotFoundError('restaurante não encontrado')
        }else{
          salao.kit = req.body // um array
          return salao.save()
        }
      }).then(salao=>{
        resp.json(salao.kit)
        return next()
      }).catch(next)
    }



  applyRoutes(application: restify.Server){

    application.get('/salao',this.findAll)
    application.get('/salao/:id',[this.validateId, this.findById])
    application.post('/salao', this.save)
    application.put('/salao/:id',[this.validateId, this.replace])
    application.patch('/salao/:id',[this.validateId, this.update])

    application.get('/salao/:id/kit',[this.validateId, this.findKit])
    application.put('/salao/:id/kit',[this.validateId, this.findKit])



  }

}
export const salaoRouter = new SalaoRouter()
