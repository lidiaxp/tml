import * as mongoose from 'mongoose';
import { Usuario } from './usuario.model';

export interface Tarefa extends mongoose.Document{
    descricao:String,
    usuario: mongoose.Types.ObjectId | Usuario,// id, nome e profissão que vai ser populado
    cliente: String,
    data: Date,
    status: boolean
}

const tarefaSchema = new mongoose.Schema({
    descricao:{
        type:String
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId
    },
    cliente:{
        type:String
    },
    data:{
        type: Date
    },
    status:{
        type:Boolean,
        enum: false
    }
})


export const Tarefa = mongoose.model<Tarefa>('Tarefa',tarefaSchema)