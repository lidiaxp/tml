import * as mongoose from 'mongoose';
import{Especialidade} from './especialidade.model'

export interface Portfolio extends mongoose.Document{
    especialidade: mongoose.Types.ObjectId | Especialidade,
    fotos: String[]
  }

  const portfolioSchema = new mongoose.Schema({
    especialidade:{
      type:String
    },
    fotos:{
      type: [String]
    }
  })

  export const Portfolio = mongoose.model<Portfolio>('Portfolio', portfolioSchema)