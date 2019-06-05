import * as mongoose from 'mongoose';
import { Tarefa } from './tarefa.model';
import { Profissional } from './profissional.model';
import { Salao, SalaoFranquia } from './salao.model';



export interface Agenda extends mongoose.Document{
    tarefa: mongoose.Types.ObjectId | Tarefa
    profissional:mongoose.Types.ObjectId | Profissional,
    salao: mongoose.Types.ObjectId | SalaoFranquia

}
 // Schema 

 

 const agendaSchema = new mongoose.Schema({
     tarefa:{
         type:mongoose.Schema.Types.ObjectId,
         required: false
     },
     profissional:{
         type:mongoose.Schema.Types.ObjectId,
         required:false
     },
     salao:{
         type:mongoose.Schema.Types.ObjectId,
         required: false
     },
     

 },{versionKey:false})

 
 export const Agenda = mongoose.model<Agenda>('Agenda',agendaSchema)