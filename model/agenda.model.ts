import * as mongoose from 'mongoose';
import { Tarefa } from './tarefa.model';
import { Profissional } from './profissional.model';
import { Salao, SalaoFranquia } from './salao.model';

export interface Tarefas extends mongoose.Document{
    tarefa:mongoose.Types.ObjectId | Tarefa
}

export interface Agenda extends mongoose.Document{
    tarefas: Tarefas[],
    profissional:mongoose.Types.ObjectId | Profissional,
    salao: mongoose.Types.ObjectId | SalaoFranquia

}
 // Schema 

 const tarefasSchema = new mongoose.Schema({
     tarefa:{
         type:mongoose.Schema.Types.ObjectId,
         required: false
     }
 })

 const agendaSchema = new mongoose.Schema({
     tarefa:{
         type:[tarefasSchema],
         required: false
     },
     profissional:{
         type:mongoose.Schema.Types.ObjectId,
         required:false
     },
     salao:{
         type:mongoose.Schema.Types.ObjectId,
         required: false
     }
 })

 export const Agenda = mongoose.model<Agenda>('Agenda',agendaSchema)