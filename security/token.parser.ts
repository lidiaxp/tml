import * as restify from 'restify';
import { Usuario } from '../model/usuario.model';
import * as jwt from 'jsonwebtoken';
import { environment } from '../common/environment';

 // função tokenParser ainda não vai fazer a autorização, vai apenas verificar se existe um token
export const tokenParser: restify.RequestHandler = (req,resp,next) =>{
    const token = extractToken(req)
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    }else{
        next()
    }
}
// buscando o usuario na base 
function extractToken(req: restify.Request){
    //Authorization: Bearer TOKEN 
    let token = undefined
    const autorizacao = req.header('autorizacao')
    if(autorizacao){
        const parts: string[] = autorizacao.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token
}


// associar o usuario no request

function applyBearer (req: restify.Request, next): (error, decoded) => void {
    return (error, decoded) =>{
        if(decoded){
            Usuario.findByEmail(decoded.sub).then(usuario =>{
                if(usuario){
                    // associar o usuario no request
                    req.authenticated = usuario // 
                }
                next()
            }).catch(next)
        } else{
            next()
        }

    }
    
}
