import * as mongoose from "mongoose";

// Comentado por Mairton Leal
// Aqui é gerado o document de Pagamento para poder gerar o schema
export interface ContaPagamento extends mongoose.Document {
  idPagamento: Number; // id da Collection Pagamento
  contaVirtual: String; //Numero da conta Virtual
  tranferirValorVirtual: Number; // Valor transferido para conta externa do usuario
  receberValorExterno: Number; // Valor Recebido do cartao externo do usuário
  saldoVirtual: Number; // saldo em conta virtual do usuario
  valorMinimo: Number; // valor minimo da conta virtual
  valorIndicacaoPrimaria: Number; // valor de bonus acrescentado na conta virtual do usuario do primeiro indicado
  valorIndicacaoSecundaria: Number; //  valor de bonus acrescentado na conta virtual do usuario do segundo nivel de indicado
  calculoVirtual: Number; // realiza o calculo virtual dos valores do usuario
}
// Schema de Pagamento das informações colocadas
const PagamentoSchema = new mongoose.Schema({
  idPagamento: {
    type: Number
  },
  contaVirtual: {
    type: String
  },
  transferirValorVirtual: {
    type: Number
  },
  recebeValorExterno: {
    type: Number
  },

  saldoVirtual: {
    type: Number
  },

  valorMinimo: {
    type: Number
  },

  valorIndicacaoPrimaria: {
    type: Number
  },

  valorIndicacaoSecundaria: {
    type: Number
  },
  calculoVirtual: {
    type: Number
  }
},{versionKey:false});

export const ContaPagamento = mongoose.model<ContaPagamento>(
  "ContaPagamento",
  PagamentoSchema
);
