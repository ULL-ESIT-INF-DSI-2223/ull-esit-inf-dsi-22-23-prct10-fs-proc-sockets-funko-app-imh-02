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

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FunkoCollection } from '../funko/funko-collection.js';
import { Funko } from '../funko/funko.js';
import { TiposFunko } from '../funko/funko.js';
import { GeneroFunko } from '../funko/funko.js';

const commands = hideBin(process.argv);
/**
 * Comando para añadir un Funko a la colección
 */
function add() {
  yargs(commands)
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
    const funkoCollection = new FunkoCollection(argv.user);
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
  
    funkoCollection.addFunko(new Funko(argv.id, argv.name, argv.desc, type, genre, argv.fr, argv.frn, argv.ex, argv.sf, argv.vl));
   })
   .help()
   .argv;

}

/**
 * Comando para listar todos los Funkos de un usuario
 */
function list() {
  yargs(commands)
    .command('list', 'List all user Funkos', {
    user: {
     description: 'user',
     type: 'string',
     demandOption: true
    }
   }, (argv) => {
    const funkoCollection = new FunkoCollection(argv.user);
    funkoCollection.getAllFunkos();
   })
   .help()
   .argv;
}

/**
 * Comando para eliminar un Funko de la colección
 */
function update() {

  yargs(commands)
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
   const funkoCollection = new FunkoCollection(argv.user);
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
 
   funkoCollection.modifyFunko(argv.id,new Funko(argv.id, argv.name, argv.desc, type, genre, argv.fr, argv.frn, argv.ex, argv.sf, argv.vl));
  })
  .help()
  .argv;
}

 /**
  * Comando para eliminar un Funko de la colección
  */
 function read() {
   yargs(commands)
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
    const funkoCollection = new FunkoCollection(argv.user);
    funkoCollection.getFunkoId(argv.id);
   })
   .help()
   .argv;

 }

 /**
  * Comando para eliminar un Funko de la colección
  */
function remove() {
  yargs(commands)
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
  const funkoCollection = new FunkoCollection(argv.user);
  funkoCollection.eraseFunko(argv.id);
 })
 .help()
 .argv;
}

add();
list();
update();
read();
remove();