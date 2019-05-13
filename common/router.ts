import * as restify from 'restify'
import{NotFoundError} from 'restify-errors'
import{EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
  abstract applyRoutes(application: restify.Server)

  envelope(document: any): any{ // começando a trabalhar com Hypermidia
    return document
  }

  render(response: restify.Response, next:restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeRender', document)
        response.json(this.envelope(document))
      }else{
        throw new NotFoundError('Documento não encontrado')
      }
      return next()
    }
  }
  renderAll(response: restify.Response, next:restify.Next){
    return(documents: any[])=>{
      if(documents){
        documents.forEach((document, index, array)=>{ // para acessar os dados de forma indexada
          this.emit('beforeRender', document)
          array[index] = this.envelope(document)
        })
        response.json(documents)
      }else{
        response.json([])
      }
      return next()
    }
  }
}
