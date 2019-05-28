import * as mongoose from 'mongoose'
import { Usuario } from './usuario.model';

// Criação do dados de Salão e Franquia por Mairton Leal

export interface KitItem extends mongoose.Document{
  produto: String, // produto do kit que será adicionado
  quantidade: String, // quantidade em litros ou materiais 
}
  
// Criando dados Cartao Salao e Franquia
 export interface InfoCartao extends mongoose.Document{
  saldoVirtual: Number,
  contaCorrente:String,
  nomeCartao: String,
  numeroCartao: Number,
  codCartao: Number,
  
 }
 export interface ProfPreferido extends mongoose.Document{
   preferidos: mongoose.Types.ObjectId | Usuario
 }

 export interface EnderecoItem extends mongoose.Document{
  rua: String,
  numero: Number,
  cep: String,
  bairro: String,
  complemento: String,
  cidade: String,
  estado: String
}

export interface RedeSocialItem extends mongoose.Document{
  tipo: String, //ex: facebook
  descricao: String   //ex: url da rede, numero, dane se
}

export interface BancasItem extends mongoose.Document{
  tipo: String, //ex: facebook
  status: Boolean,   //ex: url da rede, numero, dane se
  fotoFachada: String
}

export interface DiasItem extends mongoose.Document{
  nomeSemana: String, //ex: facebook
  horaInicio: String,  //ex: url da rede, numero, dane se
  inicioIntervalo: String,
  fimIntervalo: String,
  horarioFim: String
}

// Criando o Salão simples
export interface SalaoFranquia extends mongoose.Document{
  dono: mongoose.Types.ObjectId | Usuario,
  gerente: mongoose.Types.ObjectId | Usuario,
  nomefranquia: String, // Nome da Franquia de Salões como Marca da Empresa
  enderecoFranquias: EnderecoItem,
  redeSocial: RedeSocialItem, // aqui para linkar atalhos de instagram,Facebook da rede social do salão para visita 
  fotoFachada:String, // aqui será armazenado fotos para o salão
  bancas: BancasItem[],
  dias: DiasItem[],
  comentarios: String, // Comentarios sobre salão como ex: Recentemente construido, Com Materias novos etc.
  kit: KitItem[], // descrever materias que atendem ao serviço do salão  
  estacionamento: boolean, // descrever se salão possui/ou não estacionamento para o profissional
  tipo: String, // qual plano esta utilizando: Vip,premium
  saldoVirtual: Number,
  preferido: ProfPreferido[], // lista de profissionais preferidos
}

const bancasSchema = new mongoose.Schema({
  tipo:{
    type: String
  },
  status:{
    type: Boolean,
  },
  fotoFachada:{
    type: String,
  }
})

const diasSchema = new mongoose.Schema({
  nomeSemana:{
    type: String
  },
  horaInicio:{
    type: String,
  },
  inicioIntervalo:{
    type: String
  },
  fimIntervalo:{
    type: String
  },
  horarioFim:{
    type: String
  }
})

const redeSocialSchema = new mongoose.Schema({
  tipo:{
    type: String
  },
  descricao:{
    type: String,
  }
})

// aplicando os Schemas
const contaSalaoSchema = new mongoose.Schema({
  saldoVirtual:{
    type: Number,
    minlength:10 // minimo ao criar a conta do salão para já possuir algo em saldo
  },
  contaCorrente:{
    type: String,
  },
  nomeCartao:{
    type: String,
  },
  numeroCartao:{
    type: Number,
    maxlength: 16
  },
  codCartao:{
    type: Number,
    maxlength: 3
  }
})

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

// schema de kit de produtos do salão
const kitSchema = new mongoose.Schema({
  produto:{
    type: String,
    required: true
  },
  quantidade:{
    type: String,
    required: true
  }
})
const preferidoSchema = new mongoose.Schema({
preferido: {
  type:mongoose.Schema.Types.ObjectId,
  required: false
}
})

// schema principal
const salaoSchema = new mongoose.Schema({
  dono:{
    type: mongoose.Schema.Types.ObjectId
  },
  gerente:{
    type: mongoose.Schema.Types.ObjectId
  },
  nomefranquia:{
    type: String
  },
  enderecoFranquias:{
    type: enderecoSchema
  },
  redeSocial:{
    type: redeSocialSchema
  },
  fotoFachada:{
    type: String
  },
  bancas:{
    type: [bancasSchema]
  },
  dias:{
    type: [diasSchema]
  },
  comentarios:{
    type:String
  },
  kit:{
    type:[kitSchema]
  },
  estacionamento:{
    type:Boolean
  },
  tipo:{
    type:String
  },
  saldoVirtual:{
    type: Number
  },
  preferido:{
    type:[preferidoSchema]
  }
})

export const Salao = mongoose.model<SalaoFranquia>('Salao', salaoSchema)
