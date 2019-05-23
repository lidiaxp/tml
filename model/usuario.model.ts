import * as mongoose from 'mongoose'
import {validateCPF} from '../common/validators'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/environment'
import{Profissional} from './profissional.model'
import{Salao} from './salao.model'
import{Avaliacao} from './avaliacao.model'
import{Denuncia} from './denuncia.model'

export interface EnderecoItem extends mongoose.Document{
  rua: String,
  numero: Number,
  cep: String,
  bairro: String,
  complemento: String,
  cidade: String,
  estado: String
}

export interface LocalizacaoItem extends mongoose.Document{
  latitude: String,
  longitude: String
}

export interface Usuario extends mongoose.Document{
  nome: String,
  email: String,
  senha: String
  cpf: String,
  codigo: String,
  nascimento: Date,
  saldoConta: Number,
  endereco: EnderecoItem[],
  concaCorrente: String,
  fotoPerfil: Number[],
  status: Boolean,
  perfil: Number,
  contatos: String[],// colocar um array com tipo 
  localizacao: LocalizacaoItem[],
  recomendado1: String[],
  recomendado2: String[],
  avaliacao: mongoose.Types.ObjectId | Avaliacao,
  denuncia: mongoose.Types.ObjectId | Denuncia
}

const enderecoSchema = new mongoose.Schema({
  rua:{
    type:String
  },
  numero:{
    type:Number
  },
  cep:{
    type:String
  },
  bairro:{
    type:String
  },
  complemento:{
    type:String
  },
  cidade:{
    type:String
  },
  estado:{
    type:String
  }
})

const localizacaoSchema = new mongoose.Schema({
  latitude:{
    type:String
  },
  longitude:{
    type:Number
  }
})

const usuarioSchema = new mongoose.Schema({
  nome:{
    type: String
  },
  email:{
    type: String
  }, 
  senha:{
    type: String
  },
  cpf:{
    type: String,
    unique: true
  },
  foto:{
    type:[Number]
  },
  codigo:{
    type: String
  },
  nascimento:{
    type: Date
  },
  saldoConta:{
    type: Number
  },
  fotoPerfil:{
    type: [Number]
  },
  endereco:{
    type: [enderecoSchema]
  },
  concaCorrente:{
    type: String
  },
  status:{
    type: Boolean
  },
  perfil:{
    type: Number
  },
  contatos:{
    type: [String]
  },
  localizacao:{
    type: [localizacaoSchema]
  },
  recomendado1:{
    type: [String]
  },
  recomendado2:{
    type: [String]
  }, 
  avaliacao:{
    type:mongoose.Schema.Types.ObjectId
  }, 
  denuncia:{
    type:mongoose.Schema.Types.ObjectId
  }
})

export const Usuario = mongoose.model<Usuario>('Usuario', usuarioSchema)
