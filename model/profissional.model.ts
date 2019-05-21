import * as mongoose from 'mongoose';
import{Usuario} from './usuario.model';
import{Salao} from './salao.model';


export interface Preferido extends mongoose.Document{
  saloes: mongoose.Types.ObjectId | Salao
}

export interface Profissional extends mongoose.Document{
  usuario: mongoose.Types.ObjectId | Usuario,
  profissao:String[],
  foto_perfil: String,
  preferido: Preferido[]
}

const preferidoSchema = new mongoose.Schema({
  saloes:{
    type:mongoose.Schema.Types.ObjectId,
    required: false
  }
})
const profissaoSchema = new mongoose.Schema({
  servico:{
    type:String,
    required:true
  }
})
const profissionalSchema = new mongoose.Schema({
  usuario:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'usuario'
  },
<<<<<<< HEAD

  comentarios:{
    type: String,
    required: true,
    select: true
=======
  profissao:{
    type: [profissaoSchema],
    required:true
  },
  foto_perfil:{
    type:String,
    required: false
  },
  preferido:{
    type:[preferidoSchema],
    required: false
>>>>>>> 6bcd82685cdfd720102483465016c6043a211afa
  }

})

export const Profissional = mongoose.model<Profissional>('Profissional', profissionalSchema)