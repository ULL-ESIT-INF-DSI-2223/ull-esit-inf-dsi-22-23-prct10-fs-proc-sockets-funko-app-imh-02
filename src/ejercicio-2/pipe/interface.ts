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
import { fileInfo } from './file-info.js';

export function commandInterface() {
  const commands = hideBin(process.argv);

  yargs(commands)
  .command('info', 'Obtein file info', {
  file: {
   description: 'file',
   type: 'string',
   demandOption: true
  },
  l: {
    description: 'lines',
    demandOption: false
  },
  w: {
    description: 'words',
    demandOption: false
  },
  c: {
    description: 'chars',
    demandOption: false
  }
 }, (argv) => {
  let lines = false;
  let words = false;
  let chars = false;
  if (argv.l) {
    lines = true;
  }
  if(argv.w) {
    words = true;
  }
  if(argv.c) {
    chars = true;
  }
   fileInfo(argv.file, lines, words, chars);
 })
 .help()
 .argv;
}

commandInterface();