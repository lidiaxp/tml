import * as mongoose from 'mongoose';
import { ModelRouter } from '../common/model-router';
import{NotFoundError} from 'restify-errors';
import * as restify from 'restify';
import { ContaPagamento } from '../model/pagamento.model';
import { authorize } from '../security/authz.handler';



class PagamentoRouter extends ModelRouter<ContaPagamento> {

    constructor(){
        super(ContaPagamento)
    }

    findAll = (req,resp,next)=>{
        this.model.find() 
            .then(this.renderAll(resp,next))
            .catch(next)
          }

    applyRoutes(application: restify.Server) {
     application.get('/pagamento',this.findAll)
    application.get('/pagamento/:id',[this.validateId, this.findById])
    application.post('/pagamento', [authorize('adimin'),this.save])
    application.put('/pagamento/:id',[authorize('adimin'),this.validateId, this.replace])
    application.patch('/pagamento/:id',[authorize('adimin'),this.validateId, this.update])
    application.del('/pagamento/:id',[authorize('adimin'),this.validateId, this.delete])

        
    }
    
}
export const pagamentoRouter = new PagamentoRouter()