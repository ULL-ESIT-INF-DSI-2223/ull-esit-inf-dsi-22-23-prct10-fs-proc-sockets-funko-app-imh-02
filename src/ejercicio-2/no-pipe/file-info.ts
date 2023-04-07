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
    let linesOutput = 0;
    lines.stdout.on('data', (info) => linesOutput = info);
    lines.on('close', () => { // Manejador
      console.log(`Número de líneas: ${linesOutput}`);
    });
  }
  if (wordsNumber === true) {
    const fileContent = spawn('cat', [fileName]);
    let contentString = "";
    fileContent.stdout.on('data', (content) => contentString = content);
    console.log(contentString);
    const wc = spawn('wc', ['-w', contentString]);
    let words = 0;
    wc.stdout.on('data', (wordsNumber) => words = wordsNumber);
    wc.on('close', () => {
      console.log(`Número de palabras: ${words}`);
    }); 
  }
  if (charsNumber === true) {
    //const lines = spawn( 'wc', ['-m',fileName]);
    //console.log("Número de caracteres: ");
    //lines.stdout.pipe(process.stdout);
    const fileContent = spawn('cat', [fileName]);
    const wc = spawn('wc', ['-c']);
    fileContent.stdout.pipe(wc.stdin);
    wc.stdout.pipe(process.stdout);
  }
}

//fileInfo("./src/ejercicio-2/fichero-ejemplo/fichero1.txt", true, true, true);