import * as mongoose from 'mongoose'









export interface KitItem extends mongoose.Document{
  produto: String,
  quantidade: String
}

export interface Salao extends mongoose.Document{
  espaco: String,
  salas: Number,
  comentarios: String,
  precoHora: Number,
  kit: KitItem[],

}

// aplicando os Schemas



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

const salaoSchema = new mongoose.Schema({
  espaco:{
    type: String,
    required: true,
    enum: ['Manicure', 'Cabelereiro', 'Maquiagem', 'Barbiaria', 'Tatoador','Esteticista']
  },
  salas:{
    type: Number,
    required: true
  },
  precoHora:{
    type: Number,
    required: true
  },
  kit:{
    type:[kitSchema],
    required: false,
    select: false,
    default: []
  }

})

export const Salao = mongoose.model<Salao>('Salao', salaoSchema)
