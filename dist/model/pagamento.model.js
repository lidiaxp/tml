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
}, { versionKey: false });
exports.ContaPagamento = mongoose.model("ContaPagamento", PagamentoSchema);
