import * as mongoose from 'mongoose'



export interface Profissional extends mongoose.Document{
  servico: String,
  tipo: String,
  comentario: String

}

const profissionalSchema = new mongoose.Schema({
  servico:{
    type: String,
    required: true,
    select: true,
    enum:['Maquiadora','Manicure','Cabelereira', 'Barbeiro','Esteticista','Tatoadora']
  },
  tipo:{
    type: String,
    required: false,
    select: false
  },
  comentarios:{
    type: String,
    required: true,
    select: true
  }
})

export const Profissional = mongoose.model<Profissional>('Profissional', profissionalSchema)
