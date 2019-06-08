import * as mongoose from 'mongoose';
import{Usuario} from './usuario.model';
import{Salao} from './salao.model';
import { Timestamp } from 'bson';
import { SalaoFranquia } from './salao.model';
import { Profissao } from './profissao.model';
import{Portfolio} from './portfolio.model'




export interface Preferido extends mongoose.Document{
  saloes: mongoose.Types.ObjectId | SalaoFranquia
}

export interface Profissoes extends mongoose.Document{
  nome: mongoose.Types.ObjectId | Profissao
}

export interface Profissional extends mongoose.Document{
  usuario: mongoose.Types.ObjectId | Usuario, // nome, id
  profissao: Profissoes[],
  foto_perfil: String,
  preferido: Preferido[],
  portifolio: mongoose.Types.ObjectId | Portfolio
}


const preferidoSchema = new mongoose.Schema({
  saloes:{
    type: mongoose.Types.ObjectId
  }
})

const profissaoSchema = new mongoose.Schema({
  nome:{
    type: mongoose.Types.ObjectId
  }
})


const profissionalSchema = new mongoose.Schema({
  usuario:{
    type:mongoose.Schema.Types.ObjectId
  },
  profissao:{
    type: [profissaoSchema]
  },
  foto_perfil:{
    type: String
  },
  preferido:{
    type: [preferidoSchema]
  },
  portifolio:{
    type: mongoose.Schema.Types.ObjectId
  }
},{versionKey:false})

export const Profissional = mongoose.model<Profissional>('Profissional', profissionalSchema)