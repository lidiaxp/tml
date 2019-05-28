import * as mongoose from 'mongoose';
import{Usuario} from './usuario.model';
import{Salao} from './salao.model';
import { Timestamp } from 'bson';
import { SalaoFranquia } from './salao.model';




export interface Preferido extends mongoose.Document{
  saloes: mongoose.Types.ObjectId | SalaoFranquia
}

export interface Profissional extends mongoose.Document{
  usuario: mongoose.Types.ObjectId | Usuario, // nome, id
  profissao:String[],
  foto_perfil: String,
  preferido: Preferido[],
  
}


const preferidoSchema = new mongoose.Schema({
  saloes:{
    type:mongoose.Schema.Types.ObjectId,
    required: false
  }
})

const profissaoSchema = new mongoose.Schema({
  servico:{
    type:String,
    required:true
  }
})

const profissionalSchema = new mongoose.Schema({
  usuario:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'usuario'
  },

  comentarios:{
    type: String,
    required: true,
    select: true
  }

})

export const Profissional = mongoose.model<Profissional>('Profissional', profissionalSchema)