import {Server} from './server/server'
import{usuarioRouter} from './routers/usuarios.router'
import{profissionalRouter} from './routers/profissional.router'
import{salaoRouter} from './routers/salao.router'

const server = new Server()
server.bootstrap([usuarioRouter, profissionalRouter, salaoRouter]).then(server=>{
  console.log('Server is listening on:', server.application.address())
}).catch(error=>{
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})
