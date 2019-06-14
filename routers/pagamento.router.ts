import * as mongoose from 'mongoose';
import { ModelRouter } from '../common/model-router';
import{NotFoundError} from 'restify-errors';
import * as restify from 'restify';
import { ContaPagamento } from '../model/pagamento.model';
import { authorized } from '../security/authz.handler';





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
     application.get('/pagamento',/** [authorized('usuario'),*/this.findAll)
    application.get('/pagamento/:id',/** [authorized('usuario'),*/this.validateId, this.findById)
    application.post('/pagamento',/** [authorized('usuario'),*/this.save)
    application.put('/pagamento/:id',/** [authorized('usuario'),*/this.validateId, this.replace)
    application.patch('/pagamento/:id',/** [authorized('usuario'),*/this.validateId, this.update)
    application.del('/pagamento/:id',/** [authorized('usuario'),*/this.validateId, this.delete)

        
    }
    
}
export const pagamentoRouter = new PagamentoRouter()