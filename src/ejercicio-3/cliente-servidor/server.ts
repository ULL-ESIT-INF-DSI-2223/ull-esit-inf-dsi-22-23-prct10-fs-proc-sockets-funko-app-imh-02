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
import {watchFile} from 'fs';
import { Funko } from '../funko/funko.js';

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkoPops?: Funko[];
}



  net.createServer((connection) => {
    console.log('A client has connected.');

    connection.write(JSON.stringify({'type': 'established', 'success': 'true'}) +'\n');

    connection.on('data', (request) => {
      const message = JSON.parse(request.toString());
      console.log(`Petición recibida ${message.type}`);
    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });