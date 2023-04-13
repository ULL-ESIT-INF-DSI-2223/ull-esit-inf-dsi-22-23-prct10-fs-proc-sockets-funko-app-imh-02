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
import {EventEmitter} from 'events';
import { Funko } from '../funko/funko.js';
import { RequestType } from './client.js';
import { FunkoCollection } from '../funko/funko-collection.js';

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkoPops?: Funko[];
}


export class Server extends EventEmitter {
  constructor() {
    super();
    net.createServer((connection) => {
      console.log('A client has connected.');

      connection.write(JSON.stringify({'type': 'established', 'success': true}) +'\n');

      let wholeData = '';
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk;
        let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) { 
          wholeData = wholeData.substring(0, messageLimit);
          this.emit('request', JSON.parse(wholeData), connection);
          messageLimit = wholeData.indexOf('\n');
        }
      });

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });
    }).listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  manageAddRequest(request: RequestType, conecction: net.Socket) {
    const userName = request.user as string;
    const collection = new FunkoCollection(userName);
  }
  manageUpdateRequest(request: RequestType, conecction: net.Socket) {
    //
  }
  manageListRequest(request: RequestType, conecction: net.Socket) {
    //
  }
  manageRemoveRequest(request: RequestType, conecction: net.Socket) {
    //
  }
  manageReadRequest(request: RequestType, conecction: net.Socket) {
    //
  }
}

const server_ = new Server();

server_.on('request', (request, connection) => {
  const client_request = request as RequestType;
  console.log(`Petición recibida ${client_request.type}`);
  if(client_request.type === "add") {
    server_.manageAddRequest(client_request, connection);
  } else if (client_request.type === "update") {
    server_.manageUpdateRequest(client_request, connection);
  } else if(client_request.type === "list") {
    server_.manageListRequest(client_request, connection);
  } else if (client_request.type === "remove") {
    server_.manageRemoveRequest(client_request, connection);
  } else if(client_request.type === "read") {
    server_.manageReadRequest(client_request, connection);
  }
});