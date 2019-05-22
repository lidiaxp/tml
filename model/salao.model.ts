import * as mongoose from 'mongoose'
//import { Timestamp } from 'bson';
import { Usuario } from './usuario.model';

// Criação do dados de Salão e Franquia por Mairton Leal

//exportando dados de KitItem
export interface KitItem extends mongoose.Document{
  produto: String, // produto do kit que será adicionado
  quantidade: String, // quantidade em litros ou materiais 
  qualidade: String  // estado do serviço do material se está em Bom Estado, Regular etc.
}
 
// Criando  de Salão Franquia
export interface FranquiaSalao extends mongoose.Document{
  nomefranquia: String, // Nome da Franquia de Salões como Marca da Empresa
  quantidadeFranquia:Number, // quantidade de saloes para o usuário
  enderecoFranquias: mongoose.Types.ObjectId | Salao, // Endereço das Franquias a adicionar

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



// Criando o Salão simples
export interface Salao extends mongoose.Document{
  idSalao: String, // codigo do salão ao ser criado
  codigoSalao: String, // Codigo que salão podera compartilhar
  enderecoSalao: String, // adicionar endereço do salão simples
  redeSocial: String, // aqui para linkar atalhos de instagram,Facebook da rede social do salão para visita 
  fotoSalao:String[], // aqui será armazenado fotos para o salão
  salasDisponiveis: Number, // quantidade a ser disponivel de Salões
  selecionarDias: Date, // Agendar os dias que o salao irá funcionar dos serviços a serem alocados
  selecionarHora: Date, // Selecionar a hora dos dias de funcionamento do Salão
  comentarios: String, // Comentarios sobre salão como ex: Recentemente construido, Com Materias novos etc.
  statusSalao: boolean, // Status do salão que possui espaços ocupados e disponiveis para o serviço
  estadoMaterial: String[], // status do material que será utilizado ex: Regular, Novo, Já utilizado etc.
  kit: KitItem[], // descrever materias que atendem ao serviço do salão  
  estacionamento: boolean, // descrever se salão possui/ou não estacionamento para o profissional
  aceitarAluguel:boolean, // varivavel de aceitar pedido do profissional para aluguel
  precoHora: Number, // preço a cobrar para o salão
  cobrarAtraso: Boolean, // cobrança de Multa para o profissional que atrasar na hora
  dadosCartao: InfoCartao[], // informar dados do cartao como saldo e nome do cartao
  historicoSalao: String[], // Historico de alugueis do profissional
  preferido: ProfPreferido[], // lista de profissionais preferidos
  franquia: FranquiaSalao[] // dados a preencher em caso de mais de um salão

}

// aplicando os Schemas

// schema de salão Franquia
const franquiaSchema = new mongoose.Schema({
  nomefranquia:{
    type: String,
  },
  quantidadeFranquia:{
    type:Number,
    maxlength: 5,
    minlength:2
  },
  enderecoFranquias:{
    type:String
  }

})
// schema de conta do salão
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

// schema de kit de produtos do salão
const kitSchema = new mongoose.Schema({
  produto:{
    type: String,
    required: true
  },
  quantidade:{
    type: String,
    required: true
  },
  qualidade:{
    type:String,
    required: false 
  }
})
const preferidoSchema = new mongoose.Schema({
preferidos: {
  type:mongoose.Schema.Types.ObjectId,
  required: false
}
})
// schema principal
const salaoSchema = new mongoose.Schema({
  idSalao:{
    type: String,
  
  },
  salasDisponiveis:{
    type: Number,
    required: true
  },
  precoHora:{
    type: Number,
    required: true
  },
  selecionarDias:{
    type:Date
  },
  selecionarHora:{
    type:Date
  },
  comentarios:{
    type:String
  },
  statusSalao:{
    type:Boolean
  },
  estadoMaterial:{
    type:String
  },
  estacionamento:{
    type:Boolean
  },
  aceitarAluguel:{
    type:Boolean
  },
  cobrarAtraso:{
    type:Boolean
  },
  historicoSalao:{
    type:String,

  },
  preferido:{
    type:[preferidoSchema],
    required: false
  },
  
  kit:{
    type:[kitSchema],
    tipodeKit: String,
    quantidade: String,
    default: []
  },
  franquia:{
    type:[franquiaSchema],

  },
  dadosCartao:{
    type:[contaSalaoSchema],
  }

})

export const Salao = mongoose.model<Salao>('Salao', salaoSchema)
