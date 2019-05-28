import {Server} from './server/server'
import { avaliacaoRouter } from './routers/avaliacao.router';
import { denunciaRouter } from './routers/denuncia.router';
import { especialidadeRouter } from './routers/especialidade.router';
import { profissaoRouter } from './routers/profissao.router';
import { agendaRouter } from './routers/agenda.router';
import { tarefaRouter } from './routers/tarefa.router';
import{usuarioRouter} from './routers/usuarios.router'
import{profissionalRouter} from './routers/profissional.router'
import{salaoRouter} from './routers/salao.router'
import{portifolioRouter} from './routers/portfolio.router'


const server = new Server()

server.bootstrap(
  [usuarioRouter,
   profissionalRouter,
   salaoRouter,
   avaliacaoRouter,
   denunciaRouter,
   profissaoRouter,
   agendaRouter,
   tarefaRouter,
   portifolioRouter]).then(server=>{
  console.log('Server is listening on:', server.application.address())
}).catch(error=>{
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})
