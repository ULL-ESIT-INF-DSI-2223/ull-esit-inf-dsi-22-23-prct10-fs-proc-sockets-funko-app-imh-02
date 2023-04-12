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
    const cat = spawn('cat', ['src/ejercicio-1/file.txt']);
    
    cat.stdout.on('data', (data) => {
      const wc = spawn('wc', ['-w']);
      wc.stdin.write(data);
      wc.stdin.end();
      wc.stdout.on('data', (data) => {
        console.log(`Número de palabras: ${data}`);
      }); 
    });
  }
  if (charsNumber === true) {
    const cat = spawn('cat', ['src/ejercicio-1/file.txt']);
  
    cat.stdout.on('data', (data) => {
      const wc = spawn('wc', ['-c']);
      wc.stdin.write(data);
      wc.stdin.end();
      wc.stdout.on('data', (data) => {
        console.log(`Número de caracteres: ${data}`);
      }); 
    });
  }
}
