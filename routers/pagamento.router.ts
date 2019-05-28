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
        
    }
    
}