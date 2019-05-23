import * as mongoose from 'mongoose';
import{Usuario} from './usuario.model'

export interface Denuncia extends mongoose.Document{
    denunciador: mongoose.Types.ObjectId 
    denunciado: mongoose.Types.ObjectId 
    denuncia: String

}
const denunciaSchema = new mongoose.Schema({
    denunciador:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    
    },
    denunciado:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    denuncia:{
        type:String,
        required:true
    }
})

export const Denuncia = mongoose.model<Denuncia>('Denuncia',denunciaSchema)