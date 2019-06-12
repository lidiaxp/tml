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
  email: String[],
  telefone: String[],
  redeSocial: String[]
}

export interface ContatoItem extends mongoose.Document{
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
  fotoPerfil: String,
  status: Boolean,
  perfil: Number,
  contatos: ContatoItem[],// colocar um array com tipo 
  localizacao: LocalizacaoItem[],
  recomendado1: String[],
  recomendado2: String[],
  avaliacao: mongoose.Types.ObjectId[] | Avaliacao,
  denuncia: mongoose.Types.ObjectId[] | Denuncia,
  profiles: string[],
  matches(senha: string): Boolean,
  hasAny(...profiles: string[]): boolean

}

export interface UsuarioModel extends mongoose.Model<Usuario>{
  findByEmail(email: String, projection?: string): Promise<Usuario>
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

const contatoSchema = new mongoose.Schema({
  email:{
    type:[String]
  },
  telefone:{
    type:[String]
  },
  redeSocial:{
    type: [String]
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
    type: String
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
    type: [contatoSchema]
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
    type:[mongoose.Schema.Types.ObjectId]
  }, 
  denuncia:{
    type:[mongoose.Schema.Types.ObjectId]
  },
  profiles:{
    type: [String],
    required: false
  }
},{versionKey:false})

usuarioSchema.statics.findByEmail = function(email: String, projection: String){
  return this.findOne({email}, projection)
}

usuarioSchema.methods.matches = function(senha: string): boolean {
  return bcrypt.compareSync(senha, this.senha)
}

usuarioSchema.methods.hasAny = function(...profiles: string[]): boolean{
  return profiles.some(profiles =>this.profiles.indexOf(profiles)!== -1)
}

const hashSenha = (obj, next)=>{
  bcrypt.hash(obj.senha, environment.security.saltRounds)
  .then(hash=>{
    obj.senha = hash
    next()
  }).catch
}



export const Usuario = mongoose.model<Usuario, UsuarioModel>('Usuario', usuarioSchema)
