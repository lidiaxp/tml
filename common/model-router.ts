import{Router} from './router'
import * as mongoose from 'mongoose'
import{NotFoundError} from 'restify-errors'


// criando um tipo generico que só vai ser usado em rumtime
export abstract class ModelRouter<D extends mongoose.Document> extends Router {

  basePath: string
 pageSize: Number = 4

  constructor(protected model: mongoose.Model<D>){
    super()
    
  }

  protected prepareOne(query: mongoose.DocumentQuery<D,D>):mongoose.DocumentQuery<D,D>{
    return query
  }

  
  envelope(document: any): any{ // começando a trabalhar com Hypermidia
    let resource = Object.assign({_links:{}}, document.toJSON())
    return resource
  }

  

  validateId = (req,resp,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      next(new NotFoundError('Document not found 2'))
    }else{
     next()
    }
  }
  
  // metodo get
  
  

  // metodo get por Id
  findById = (req,resp,next)=>{
    this.model.findOne({ _id: req.params.id})
    this.prepareOne(this.model.findOne({ _id: req.params.id }))
    .then(this.render(resp,next)).catch(next)
  }

  // metodo Post
  save = (req,resp,next)=>{
    let document = new this.model(req.body)
    document.save().then(this.render(resp,next)).catch(next)
  }

  // metodo Pacht
  replace =  (req, resp, next)=>{
    const options =  {runValidators: true, overwrite: true}
    this.model.update({_id:req.params.id}, req.body, options).exec().then(result=>{
      if(result.n){
        return this.model.findById(req.params.id)
      } else{
        throw new NotFoundError('Documento não encontrado')
      }
    }).then(this.render(resp,next)).catch(next)
  }
  // metodo update
  update = (req,resp,next)=>{
    const options = {runValidators: true, new:true}
    this.model.findByIdAndUpdate(req.params.id, req.body, options)
    .then(this.render(resp,next)).catch(next)
  }
  
  delete = (req, resp, next)=>{
    this.model.remove({_id:req.params.id}).exec().then((cmdResult: any)=>{
      if(cmdResult.n){
        resp.send(204)
        return next()
      } else {
        resp.send(200)
        //throw new NotFoundError('Documento não encontrado')
      }
      return next()

    }).catch(next)
  }
}
