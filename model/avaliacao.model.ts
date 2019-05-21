import * as mongoose from 'mongoose'
import {environment} from '../common/environment'

export interface Avaliacao extends mongoose.Document{
    avaliador: String,
    avaliado: String,
    nota: Number,
    comentario: String
}

const avaliacaoSchema = new mongoose.Schema({
    avaliador:{
      type:String
    },
    avaliado:{
      type:String
    },
    nota:{
        type:Number
    },
    comentario:{
        type:String
    },
})

export const Avaliacao = mongoose.model<Avaliacao>('Avaliacao', avaliacaoSchema)