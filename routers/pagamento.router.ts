import * as mongoose from 'mongoose';
import { ModelRouter } from '../common/model-router';
import{NotFoundError} from 'restify-errors';
import * as restify from 'restify';
import { ContaPagamento } from '../model/pagamento.model';


class PagamentoRouter extends ModelRouter<ContaPagamento> {

    constructor(){
        super(ContaPagamento)
    }

    applyRoutes(application: restify.Server) {
     application.get('/pagamento',this.findAll)
    application.get('/pagamento/:id',[this.validateId, this.findById])
    application.post('/pagamento', this.save)
    application.put('/pagamento/:id',[this.validateId, this.replace])
    application.patch('/pagamento/:id',[this.validateId, this.update])
    application.del('/pagamento/:id',[this.validateId, this.delete])

        
    }
    
}
export const pagamentoRouter = new PagamentoRouter()