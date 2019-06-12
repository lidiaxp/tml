
import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../model/usuario.model';
import { environment } from '../common/environment';

// verificar para ver se aquele token é um token real
export const tokenParser: restify.RequestHandler = (req,resp,next)=>{
    const token = extractToken(req)
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    } else{
        next()
    }
}

// processo de extração do token
function extractToken(req: restify.Request){
    let token = undefined
    // esperamos que o token venha como um heade
    // authenticate: Bearer(portador do token) TOKEN 
    const authorization = req.header('authorization')
    if(authorization){
        const parts: string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1] // retornando apensar o token
        }
    }
    return token
}


function applyBearer (req: restify.Request, next): (error, decoded) => void{
    return (error, decoded) =>{
        if(decoded){
            Usuario.findByEmail(decoded.Sub).then(usuario=>{
                if(usuario){
                    // associar o usuario no request
                    req.authenticated = usuario 
                }
                next()
            }).catch(next)
        }else{
             next()
        }
    }
}