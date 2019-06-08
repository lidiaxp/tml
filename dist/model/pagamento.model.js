"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
<<<<<<< HEAD
});
exports.Pagamento = mongoose.model("ContaPagamento", PagamentoSchema);
=======
}, { versionKey: false });
exports.ContaPagamento = mongoose.model("ContaPagamento", PagamentoSchema);
>>>>>>> a980a3d0a1ae15afaf22a0bf2ced9a9730ad7c89
