import * as mongoose from 'mongoose';

export interface Profissao extends mongoose.Document{
    nome: String // nome, id
    
  }

  const profissaoSchema = new mongoose.Schema({
    nome:{
      type:String
    }
  },{versionKey:false})

  export const Profissao = mongoose.model<Profissao>('Profissao', profissaoSchema)