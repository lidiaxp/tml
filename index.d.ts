import { Usuario } from './model/usuario.model';

declare module 'restify' {
    export interface Request {
        authenticated: Usuario
    }
}
