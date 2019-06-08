import * as mongoose from 'mongoose';
import{Especialidade} from './especialidade.model'

export interface Portfolio extends mongoose.Document{
    
    fotos: String[]
  }

  const portfolioSchema = new mongoose.Schema({
    
    fotos:{
      type: [String]
    }
  },{versionKey:false})

  export const Portfolio = mongoose.model<Portfolio>('Portfolio', portfolioSchema)