import * as restify from 'restify';
import { Usuario } from '../model/usuario.model';
import * as jwt from 'jsonwebtoken';
import { NotAuthorizedError } from 'restify-errors';
import { userInfo } from 'os';
import { environment } from '../common/environment';

// feito por yuri pimentel


export const autenticacao: restify.RequestHandler = (req,resp,next)=>{ // tipando a constante
    const {email, senha} = req.body // fazendo a busca de autenticação pelo email
    Usuario.findByEmail(email, '+senha')
    .then(usuario=>{
        if(usuario && usuario.matches(senha)){
            // aqui vai ser gerado o token
           const token =  jwt.sign({sub: usuario.email, iss: 'misslaura'},
           environment.security.apiSecret )
           resp.json({nome:usuario.nome, email: usuario.email, acessToken: token})
           return next(false)
        }else{
            return next(new NotAuthorizedError('credenciais invalidas'))
        }
    }).catch(next)

}