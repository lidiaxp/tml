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



// Criando o Salão simples
export interface SalaoFranquia extends mongoose.Document{
  dono: mongoose.Types.ObjectId | Usuario,
  nomefranquia: String, // Nome da Franquia de Salões como Marca da Empresa
  quantidadeFranquia:Number, // quantidade de saloes para o usuário
  enderecoFranquias: [{ // endereço franquia em object
    nomefranquia:{
      type: String,
    },
    quantidadeFranquia:{
      type:Number,
      minlength:1
    },
    enderecoFranquias:{
      type:String
    }
  }]
  idFranquia_Numero: String, // codigo do salão ao ser criado

  enderecoSalao: String, // adicionar endereço do salão simples
  redeSocial: String, // aqui para linkar atalhos de instagram,Facebook da rede social do salão para visita 
<<<<<<< HEAD
  fotoSalao:Number[], // aqui será armazenado fotos para o salão
  
  fotoBanner: Number[], //aqui será para fotos das Banners de faixa da frente comentadas com Alexandre
=======
  fotoSalao:String, // aqui será armazenado fotos para o salão
  fotoBancadas: String[], // aqui será para fotos das bancadas comentadas com Alexandre
  fotoBanner: String, //aqui será para fotos das Banners de faixa da frente comentadas com Alexandre
>>>>>>> b8e82d4f96d64ed0b7ffd156f4a6ad232f3e3f5c
  bancas: [    // array para armazenamento do tipo do serviço e status disponivel, ocupado.
    {
      tipo: String,
      status: boolean,
      fotoFachadas    // aqui será para fotos das bancadas comentadas com Alexandre
    }
  ], // quantidade a ser disponivel de Salões
  selecionarDias: Date, // Agendar os dias que o salao irá funcionar dos serviços a serem alocados
  selecionarHora: Date, // Selecionar a hora dos dias de funcionamento do Salão
  horaIntervalo: Date, // Inserindo intervalo em que o salao fica fechado ou pausa para o almoço
  comentarios: String, // Comentarios sobre salão como ex: Recentemente construido, Com Materias novos etc.

  kit: KitItem[], // descrever materias que atendem ao serviço do salão  
  estacionamento: boolean, // descrever se salão possui/ou não estacionamento para o profissional
  tipo: String, // qual plano esta utilizando: Vip,premium
  dadosCartao: InfoCartao[], // informar dados do cartao como saldo e nome do cartao
  historicoSalao: [{
    registro: String,
    hora: Date
  }], // Historico de alugueis do profissional
  preferido: ProfPreferido[], // lista de profissionais preferidos
 

}

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
  idSalao:{
    type: String
  
  },
  bancas:{
    type: String,
    status:Boolean
  },

  precoHora:{
    type: Number,
    required: true
  },
  tipo:{
    type:String
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
 
  estacionamento:{
    type:Boolean
  },
  fotoSalao:{
  type:String
  },
  fotoBanner:{
  type:[String]
  },
  fotoBancadas:{
  type:String
  },
  historicoSalao:{
    type:String,
    hora: Date
  },
  preferido:{
    type:[preferidoSchema],
    required: false
  },

  kit:{
    type:[kitSchema],
    tipodeKit: String,
    quantidade: String,
    default: [],
  },
  dadosCartao:{
    type:[contaSalaoSchema]
  }

})

export const Salao = mongoose.model<SalaoFranquia>('Salao', salaoSchema)
