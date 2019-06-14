
import * as restify from 'restify';
import {ForbiddenError} from 'restify-errors';

// ela vai receber os perfils e retornar um requesthendler
export const authorized: (...profiles: string[])=> restify.RequestHandler =(...profiles)=>{
    return (req,resp,next)=>{
        if(req.authenticated !== undefined){
            next()
        }else{
            next(new ForbiddenError('Permissão Negada'))
        }
    }
}

