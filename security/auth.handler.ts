import * as restify from 'restify';
import {NotAuthorizedError} from 'restify-errors'
import { Usuario } from '../model/usuario.model';




// tipando a constante.
// para ter autenticação, tem que ter duas resposta que devem vir do body da resposta
export const authenticate: restify.RequestHandler = (req, resp,next)=>{
    const {email, senha} = req.body // informações que vem do request
    Usuario.findByEmail(email, '+senha').then(usuario=>{ // se ele encontrar o email, vai pro then
        // verificar se existe um usuario com aquele email
        if(usuario && usuario.matches(senha)){ // se o usuario existir 
            // gerar token 
        } else{
            return next(new NotAuthorizedError('credenciais invalidas'))
        }
    }).catch(next)



}

