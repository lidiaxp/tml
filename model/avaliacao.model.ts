import * as mongoose from 'mongoose'
import{Usuario} from './usuario.model'

export interface Avaliacao extends mongoose.Document{
    avaliador: mongoose.Types.ObjectId | Usuario,
    avaliado: mongoose.Types.ObjectId | Usuario,
    nota: Number,
    comentario: String
}

const avaliacaoSchema = new mongoose.Schema({
    avaliador:{
      type:mongoose.Schema.Types.ObjectId
    },
    avaliado:{
      type:mongoose.Schema.Types.ObjectId
    },
    nota:{
        type:Number
    },
    comentario:{
        type:String
    },
})

export const Avaliacao = mongoose.model<Avaliacao>('Avaliacao', avaliacaoSchema)