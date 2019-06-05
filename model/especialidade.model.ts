import * as mongoose from 'mongoose';
import{Profissao} from './profissao.model';

export interface Especialidade extends mongoose.Document{
    nome: String,
    categoria: mongoose.Schema.Types.ObjectId | Profissao
  }

  const especialidadeSchema = new mongoose.Schema({
    usuario:{
      type:String
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId 
    }
  },{versionKey:false})

  export const Especialidade = mongoose.model<Especialidade>('Especialidade', especialidadeSchema)