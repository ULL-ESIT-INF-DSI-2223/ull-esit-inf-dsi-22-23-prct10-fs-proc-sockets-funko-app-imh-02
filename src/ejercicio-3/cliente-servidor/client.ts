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
import { FunkoCollection } from '../funko/funko-collection.js';
import { Funko } from '../funko/funko.js';
import { TiposFunko } from '../funko/funko.js';
import { GeneroFunko } from '../funko/funko.js';

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  funkoPop?: Funko[]
}

export class Client {
  private client: net.Socket;
  private commands: string[];

  constructor() {
    this.add();
    this.client = net.connect({port: 60300});
    this.commands = hideBin(process.argv);
  }

  add() {
    yargs(this.commands)
      .command('add', 'Adds a funko', {
      user: {
        description: 'User',
        type: 'string',
        demandOption: true
      }
    //   id: {
    //    description: 'Funko ID',
    //    type: 'number',
    //    demandOption: true
    //   },
    //   name: {
    //     description: 'Funko name',
    //     type: 'string',
    //     demandOption: true
    //   },
    //   desc: {
    //     description: 'Funko description',
    //     type: 'string',
    //     demandOption: true
    //   }, 
    //   type: {
    //     description: 'Funko type',
    //     type: 'string',
    //     demandOption: true
    //   },
    //   genre: {
    //     description: 'Funko genre',
    //     type: 'string',
    //     demandOption: true
    //   }, 
    //   fr: {
    //     description: 'Funko franchise',
    //     type: 'string',
    //     demandOption: true
    //   },
    //   frn: {
    //     description: 'Funko franchise number',
    //     type: 'number',
    //     demandOption: true
    //   },
    //   ex: {
    //     description: 'Funko exclusive',
    //     type: 'boolean',
    //     demandOption: true
    //   },
    //     type: 'string',
    //     demandOption: true
    //   },
    //   vl: {
    //     description: 'Funko value',
    //     type: 'number',
    //     demandOption: true
    //   } sf: {
    //     description: 'Funko special features',
    //     type: 'string',
    //     demandOption: true
    //   },
    //   vl: {
    //     description: 'Funko value',
    //     type: 'number',
    //     demandOption: true
    //   }
     }, (argv) => {
      const funkoCollection = new FunkoCollection(argv.user);
      // let type: TiposFunko = TiposFunko.POP;
      // switch (argv.type) {
      //   case 'POP!':
      //     type = TiposFunko.POP;
      //     break;
      //   case 'POP! Rides':
      //     type = TiposFunko.POPRIDES;
      //     break;
      //   case 'Vynil Soda':
      //     type = TiposFunko.VYNILSODA;
      //     break;
      //   case 'Vynil Gold':
      //     type = TiposFunko.VYNILGOLD;
      //     break;
      // }
    
      // let genre: GeneroFunko = GeneroFunko.ANIMACION;
      // switch (argv.genre) {
      //   case 'Animación':
      //     genre = GeneroFunko.ANIMACION;
      //     break;
      //   case 'Peliculas':
      //     genre = GeneroFunko.PELICULAS;
      //     break;
      //   case 'TV':
      //     genre = GeneroFunko.TV;
      //     break;
      //   case 'Videojuegos':
      //     genre = GeneroFunko.VIDEOJUEGOS;
      //     break;
      //   case 'Deportes':
      //     genre = GeneroFunko.DEPORTES;
      //     break;
      //   case 'Música':
      //     genre = GeneroFunko.MUSICA;
      //     break;
      //   case 'Anime':
      //     genre = GeneroFunko.ANIME;
      //     break;
      // }
      
      //funkoCollection.addFunko(new Funko(argv.id, argv.name, argv.desc, type, genre, argv.fr, argv.frn, argv.ex, argv.sf, argv.vl));
      this.sendRequest(JSON.stringify({'type': 'add'}));
    })
     .help()
     .argv;
  }

  sendRequest(request:  string) {
    this.client.write(request);
  }

}

const cliente = new Client();
cliente.sendRequest(JSON.stringify({'type': 'add'}));

// const client = net.connect({port: 60300});

// client.on('data', (dataJSON) => {
//   const message = JSON.parse(dataJSON.toString());

//   if (message.type === 'established') {
//     console.log(`Conexión correcta`);

//   } 
// })