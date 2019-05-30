import{Router} from './router'
import * as mongoose from 'mongoose'
import{NotFoundError} from 'restify-errors'


// criando um tipo generico que só vai ser usado em rumtime
export abstract class ModelRouter<D extends mongoose.Document> extends Router {

 

  constructor(protected model: mongoose.Model<D>){
    super()
    
  }

  protected prepareOne(query: mongoose.DocumentQuery<D,D>):mongoose.DocumentQuery<D,D>{
    return query
  }

  validateId = (req,resp,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      next(new NotFoundError('Document not found 2'))
    }else{
     next()
    }
  }
  
  // metodo get
  findAll = (req,resp,next)=>{
this.model.find() 
    .then(this.renderAll(resp,next))
    .catch(next)
  }

  find = (req,resp,next)=>{
    console.log(req.params);
    var search = req.params.descricao;
    this.model.find({descricao: new RegExp(search)}) 
        .then(this.renderAll(resp,next))
        .catch(next)
      
    resp.send(req.params + "oi")
      }


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
      if(cmdResult.result.n){
        resp.send(204)
        return next()
      } else {
        throw new NotFoundError('Documento não encontrado')
      }
      return next()

    }).catch(next)
  }
}
