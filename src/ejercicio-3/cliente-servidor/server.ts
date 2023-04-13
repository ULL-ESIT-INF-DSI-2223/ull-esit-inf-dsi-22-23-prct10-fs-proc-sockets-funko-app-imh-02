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
  funkoPops?: Funko;
  funkoPopsList?: Funko[];
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
        wholeData = '';
      });

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });
    }).listen(60301, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  manageAddRequest(request: RequestType, connection: net.Socket){
    const userName = request.user as string;;
    const collection = new FunkoCollection(userName);
    if (request.funkoPop !== undefined) {
      const funko_json = JSON.parse(request.funkoPop);
      collection.addFunko(new Funko(funko_json.id, funko_json.nombre, funko_json.descripcion, funko_json.tipo, funko_json.genero, funko_json.franquicia, funko_json.numeroFranquicia, funko_json.exclusivo, funko_json.caracteristicasEspeciales, funko_json.valor));
      const response: ResponseType = {'type': 'add', 'success': true};
      connection.write(JSON.stringify(response) + '\n');
    } else {
      const response: ResponseType = {'type': 'add', 'success': false};
      connection.write(JSON.stringify(response) + '\n');
    }
  }

  manageUpdateRequest(request: RequestType, connection: net.Socket) {
    const userName = request.user as string;
    const id = request.id as number;
    const collection = new FunkoCollection(userName);
    if (request.funkoPop !== undefined) {
      const funko_json = JSON.parse(request.funkoPop);
      collection.modifyFunko(id,new Funko(funko_json.id, funko_json.nombre, funko_json.descripcion, funko_json.tipo, funko_json.genero, funko_json.franquicia, funko_json.numeroFranquicia, funko_json.exclusivo, funko_json.caracteristicasEspeciales, funko_json.valor));
      const response: ResponseType = {'type': 'update', 'success': true};
      connection.write(JSON.stringify(response) + '\n');
    } else {
      const response: ResponseType = {'type': 'update', 'success': false};
      connection.write(JSON.stringify(response) + '\n');
    }
  }

  manageListRequest(request: RequestType, connection: net.Socket) {
    const userName = request.user as string;
    const collection = new FunkoCollection(userName);
    if (collection.getAllFunkos().length > 0) {
      const response: ResponseType ={'type': 'list', 'success': true, 'funkoPopsList': collection.getAllFunkos()};
      connection.write(JSON.stringify(response) + '\n');
    } else {
      const response: ResponseType ={'type': 'list', 'success': false};
      connection.write(JSON.stringify(response) + '\n');
    }
  }
  manageRemoveRequest(request: RequestType, connection: net.Socket) {
    const userName = request.user as string;
    const id = request.id as number;
    const collection = new FunkoCollection(userName);
    if(collection.eraseFunko(id) !== undefined){
      const response: ResponseType = {'type': 'remove', 'success': true};
      connection.write(JSON.stringify(response) + '\n');
    } else {
      const response: ResponseType = {'type': 'remove', 'success': false};
      connection.write(JSON.stringify(response) + '\n');
    }
  }
  manageReadRequest(request: RequestType, connection: net.Socket) {
    const userName = request.user as string;
    const collection = new FunkoCollection(userName);
    const id = request.id as number;
    if (collection.getFunkoId(id) !== undefined) {
      // const response: ResponseType ={'type': 'read', 'success': true, 'funkoPops': collection.getFunkoId(id) as Funko};
      // connection.write(JSON.stringify(response) + '\n');
    } else {
      const response: ResponseType ={'type': 'read', 'success': false};
      connection.write(JSON.stringify(response) + '\n');
    }
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
  //
});