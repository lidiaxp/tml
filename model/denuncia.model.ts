import * as mongoose from 'mongoose';
import{Usuario} from './usuario.model'

export interface Denuncia extends mongoose.Document{
    denunciador: mongoose.Types.ObjectId | Usuario,
    denunciado: mongoose.Types.ObjectId | Usuario,
    denuncia: String

}
const denunciaSchema = new mongoose.Schema({
    denunciador:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'usuario'
    },
    denunciado:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'usuario'
    },
    denuncia:{
        type:String,
        required:true
    }
})

export const Denuncia = mongoose.model<Denuncia>('denuncia',denunciaSchema)