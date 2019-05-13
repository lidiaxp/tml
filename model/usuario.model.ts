import * as mongoose from 'mongoose'
import {validateCPF} from '../common/validators'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/environment'
import{Profissional} from './profissional.model'
import{Salao} from './salao.model'





export interface EnderecoItem extends mongoose.Document{
  estado: String,
  cidade: String,
  cep: String,
  numero: String
  complemento: String
}



export interface ContatosItem extends mongoose.Document{
  email:String,
  celular: String,
  instagram: String,
  facebook: String
}

export interface AvaliacaoItem extends mongoose.Document{
  avaliador: mongoose.Types.ObjectId | Usuario,
  nota: Number,
  comentario: String
}

export interface FotosItem extends mongoose.Document{
  tag: String,
  imagem: String
}

export interface PreferidoItem extends mongoose.Document{
  cliente: mongoose.Types.ObjectId | Usuario
}


export interface Usuario extends mongoose.Document{
  nome: String,
  rg: String,
  cpf: String,
  codigo: String,
  nascimento: String,
  contatos: ContatosItem[],
  endereco: EnderecoItem[],
  fotos: FotosItem[],
  avaliacao: AvaliacaoItem[],
  preferido: PreferidoItem[],
  perfilProfissional: mongoose.Types.ObjectId | Profissional,
  perfilSalao: mongoose.Types.ObjectId | Salao
}

// export interface UsuarioModel extends mongoose.Model<Usuario>{
//   findByPreferido(preferido:mongoose.Types.ObjectId | Usuario): Promise<Usuario>
// }

const enderecoSchema = new mongoose.Schema({
  estado:{
    type: String,
    required:true,
    enum:['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
  },
  cidade:{
    type: String,
    required: true
  },
  cep:{
    type: String,
    required: true,
    maxlength:8
  },
  numero:{
    type: String,
    required: true,
    maxlength: 5
  },
  complemento:{
    type: String,
    required: true,
    maxlength: 25
  }
})

const contatosSchema = new mongoose.Schema({
  email:{
    type:String,
    unique: true,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  celular:{
    type: String,
    unique: true,
    required: true
  },
  instagram:{
    type: String,
    unique: true,
    required: true
  },
  facebook:{
    type: String,
    unique: true,
    required: true
  }
})

const avaliacaoSchema = new mongoose.Schema({
  avaliador:{
    type:mongoose.Schema.Types.ObjectId,
    required: false,
    selec: false
  },
  nota:{
    type: Number,
    required: false,
    
  },
  comentario:{
    type: String,
    required: false,
    maxlength: 120
  }
})

const fotosSchema = new mongoose.Schema({
  tag:{
    type: String,
    required: false,
    select: false
  },
  imagem:{
    type: String,
    required: false,
    select: false
  }
})

const preferidoSchema = new mongoose.Schema({
  cliente:{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    select: false
  }
})

const usuarioSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true,
    maxlength: 40,
    minlength: 1
  },
  rg:{
    type:String,
    required: true,
    unique: true
  },
  cpf:{
    type: String,
    require: false,
    validate:{
      validator: validateCPF,
      message:'{PATH}: Invalid CPF({VALUE})'
    }
  },
  codigo:{
    type:String,
    required: true,
    unique: true,
    maxlength: 10,
    minlength: 2
  },
  nascimento:{
    type: String,
    required: true
  },
  contatos:{
    type:[contatosSchema],
    required: false,
    select: false
  },
  endereco:{
    type:[enderecoSchema],
    required: false,
    select: false
  },
  fotos:{
    type:[fotosSchema],
    required: false,
    select: false
  },
  avaliacao:{
    type:[avaliacaoSchema],
    required: false,
    select: false
  },
  preferido:{
    type:[preferidoSchema],
    required: false,
    select: false
  },
  perfilProfissional:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profissao',
    required: false
  },
  perfilSalao:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salao',
    required: false
  }
})

// usuarioSchema.static.findByPreferido = function(preferido: mongoose.Schema.Types.ObjectId){
//   return this.findOne({preferido})
// }

export const Usuario = mongoose.model<Usuario>('Usuario', usuarioSchema)
