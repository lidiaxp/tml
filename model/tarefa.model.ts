import * as mongoose from 'mongoose';
import { Usuario } from './usuario.model';



export interface Servico extends mongoose.Document{
    tipo: String,
    descricao: String,
    cliente: String,
    status: Number
}


export interface Tarefa extends mongoose.Document{
    servico: Servico[],
    realizador: mongoose.Types.ObjectId | Usuario,
    cliente: mongoose.Types.ObjectId,
    data: Date,
    status: Number
}

// schema 

const servicoSchema = new mongoose.Schema({
    tipo:{
        type: String,
        required: true,
        maxlength: 50
    },
    descricao:{
        type: String,
        required: false,
        maxlength: 300
    },
    cliente:{
        type: String,
        required: true,
        maxlength:50
    },
    status:{
        type: Number,
        required:true,
        enum: 0 // status de a fazer
    }

})

const tarefaSchema = new mongoose.Schema({
    servico:{
        type:[servicoSchema],
        required: false,

    },
    realizador:{
        type:mongoose.Schema.Types.ObjectId
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId
    },
    data:{
        type: Date,
      
    },
    status:{
        type:Number,

    }
})

export const Tarefa = mongoose.model<Tarefa>('Tarefa',tarefaSchema)