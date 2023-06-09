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

import {spawn} from 'child_process';

export function fileInfo(fileName: string,linesNumber: boolean, wordsNumber: boolean, charsNumber: boolean) {
  if (linesNumber === true) {
    const lines = spawn( 'grep', ['-c', '^', fileName]);
    lines.stdout.pipe(process.stdout);
  }
  if (wordsNumber === true) {
    const fileContent = spawn('cat', [fileName]);
    const wc = spawn('wc', ['-w']);
    fileContent.stdout.pipe(wc.stdin);
    wc.stdout.pipe(process.stdout);
  }
  if (charsNumber === true) {
    const fileContent = spawn('cat', [fileName]);
    const wc = spawn('wc', ['-c']);
    fileContent.stdout.pipe(wc.stdin);
    wc.stdout.pipe(process.stdout);
  }
}