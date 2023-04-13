/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Curso: 3º
 * Práctica 10: API asincrona, creación de procesos y sockets
 * @author Ismael Martín Herrera
 * @email alu0101397375@ull.edu.es
 * @date 13/04/2023
 */

import net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Funko } from '../funko/funko.js';
import { TiposFunko } from '../funko/funko.js';
import { GeneroFunko } from '../funko/funko.js';
import {EventEmitter} from 'events';

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user?: string
  funkoPop?: Funko[]
  id?: number
}

export class Client extends EventEmitter {
  private client: net.Socket;
  private commands: string[];

  constructor() {
    super();
    this.client = net.connect({port: 60300});
    this.commands = hideBin(process.argv);
    this.add();
    this.list();
    this.read();
    this.update();
    this.remove();
    let wholeData = '';
    this.client.on('data', (dataChunk) => {
      wholeData += dataChunk;
      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) { 
        wholeData = wholeData.substring(0, messageLimit);
        this.emit('response', JSON.parse(wholeData));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }

  add() {
    yargs(this.commands)
      .command('add', 'Adds a funko', {
      user: {
        description: 'User',
        type: 'string',
        demandOption: true
      },
      id: {
       description: 'Funko ID',
       type: 'number',
       demandOption: true
      },
      name: {
        description: 'Funko name',
        type: 'string',
        demandOption: true
      },
      desc: {
        description: 'Funko description',
        type: 'string',
        demandOption: true
      }, 
      type: {
        description: 'Funko type',
        type: 'string',
        demandOption: true
      },
      genre: {
        description: 'Funko genre',
        type: 'string',
        demandOption: true
      }, 
      fr: {
        description: 'Funko franchise',
        type: 'string',
        demandOption: true
      },
      frn: {
        description: 'Funko franchise number',
        type: 'number',
        demandOption: true
      },
      ex: {
        description: 'Funko exclusive',
        type: 'boolean',
        demandOption: true
      },
      sf: {
        description: 'Funko special features',
        type: 'string',
        demandOption: true
      },
      vl: {
        description: 'Funko value',
        type: 'number',
        demandOption: true
      }
     }, (argv) => {
      let type: TiposFunko = TiposFunko.POP;
      switch (argv.type) {
        case 'POP!':
          type = TiposFunko.POP;
          break;
        case 'POP! Rides':
          type = TiposFunko.POPRIDES;
          break;
        case 'Vynil Soda':
          type = TiposFunko.VYNILSODA;
          break;
        case 'Vynil Gold':
          type = TiposFunko.VYNILGOLD;
          break;
      }
    
      let genre: GeneroFunko = GeneroFunko.ANIMACION;
      switch (argv.genre) {
        case 'Animación':
          genre = GeneroFunko.ANIMACION;
          break;
        case 'Peliculas':
          genre = GeneroFunko.PELICULAS;
          break;
        case 'TV':
          genre = GeneroFunko.TV;
          break;
        case 'Videojuegos':
          genre = GeneroFunko.VIDEOJUEGOS;
          break;
        case 'Deportes':
          genre = GeneroFunko.DEPORTES;
          break;
        case 'Música':
          genre = GeneroFunko.MUSICA;
          break;
        case 'Anime':
          genre = GeneroFunko.ANIME;
          break;
      }
    
      const new_funko = new Funko(argv.id, argv.name, argv.desc, type, genre, argv.fr, argv.frn, argv.ex, argv.sf, argv.vl);
      const request: RequestType = {'type': 'add', 'user': argv.user, 'funkoPop': [new_funko]};
      this.sendRequest(request)
     })
     .help()
     .argv;
  
  }

  list() {
    yargs(this.commands)
      .command('list', 'List all user Funkos', {
      user: {
       description: 'user',
       type: 'string',
       demandOption: true
      }
     }, (argv) => {
      const request: RequestType = {'type': 'list', 'user': argv.user};
      this.sendRequest(request)
     })
     .help()
     .argv;
  }

  update() {

    yargs(this.commands)
     .command('update', 'Update a Funko', {
     user: {
       description: 'User',
       type: 'string',
       demandOption: true
     },
     id: {
      description: 'Funko ID',
      type: 'number',
      demandOption: true
     },
     name: {
       description: 'Funko name',
       type: 'string',
       demandOption: true
     },
     desc: {
       description: 'Funko description',
       type: 'string',
       demandOption: true
     }, 
     type: {
       description: 'Funko type',
       type: 'string',
       demandOption: true
     },
     genre: {
       description: 'Funko genre',
       type: 'string',
       demandOption: true
     }, 
     fr: {
       description: 'Funko franchise',
       type: 'string',
       demandOption: true
     },
     frn: {
       description: 'Funko franchise number',
       type: 'number',
       demandOption: true
     },
     ex: {
       description: 'Funko exclusive',
       type: 'boolean',
       demandOption: true
     },
     sf: {
       description: 'Funko special features',
       type: 'string',
       demandOption: true
     },
     vl: {
       description: 'Funko value',
       type: 'number',
       demandOption: true
     }
    }, (argv) => {
     let type: TiposFunko = TiposFunko.POP;
     switch (argv.type) {
       case 'POP!':
         type = TiposFunko.POP;
         break;
       case 'POP! Rides':
         type = TiposFunko.POPRIDES;
         break;
       case 'Vynil Soda':
         type = TiposFunko.VYNILSODA;
         break;
       case 'Vynil Gold':
         type = TiposFunko.VYNILGOLD;
         break;
     }
   
     let genre: GeneroFunko = GeneroFunko.ANIMACION;
     switch (argv.genre) {
       case 'Animación':
         genre = GeneroFunko.ANIMACION;
         break;
       case 'Peliculas':
         genre = GeneroFunko.PELICULAS;
         break;
       case 'TV':
         genre = GeneroFunko.TV;
         break;
       case 'Videojuegos':
         genre = GeneroFunko.VIDEOJUEGOS;
         break;
       case 'Deportes':
         genre = GeneroFunko.DEPORTES;
         break;
       case 'Música':
         genre = GeneroFunko.MUSICA;
         break;
       case 'Anime':
         genre = GeneroFunko.ANIME;
         break;
     }
     const new_funko = new Funko(argv.id, argv.name, argv.desc, type, genre, argv.fr, argv.frn, argv.ex, argv.sf, argv.vl);
      const request: RequestType = {'type': 'update','user': argv.user, 'funkoPop': [new_funko]};
      this.sendRequest(request)
    })
    .help()
    .argv;
  }

  read() {
    yargs(this.commands)
     .command('read', 'Show al information of a Funko', {
     user: {
      description: 'user',
      type: 'string',
      demandOption: true
     },
     id: {
       description: 'Funko ID',
       type: 'number',
       demandOption: true,
     }
    }, (argv) => {
      const request: RequestType = {'type': 'read', 'user': argv.user, 'id': argv.id};
      this.sendRequest(request)
    })
    .help()
    .argv;
 
  }

  remove() {
    yargs(this.commands)
    .command('remove', 'Remove a funko', {
    user: {
     description: 'user',
     type: 'string',
     demandOption: true
    },
    id: {
      description: 'Funko ID',
      type: 'number',
      demandOption: true,
    }
   }, (argv) => {
    const request: RequestType = {'type': 'remove', 'user': argv.user, 'id': argv.id};
    this.sendRequest(request)
   })
   .help()
   .argv;
  }

  sendRequest(request:  RequestType) {
    this.client.write(JSON.stringify(request) + '\n');
  }

}

const cliente = new Client();


cliente.on('response', (request) => {
  console.log(`Respuesta recibida ${request.type}`);
});