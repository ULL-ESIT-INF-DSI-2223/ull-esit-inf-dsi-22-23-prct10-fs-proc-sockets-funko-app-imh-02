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

import 'mocha';
import {expect} from 'chai';
import {Server} from '../../../src/ejercicio-3/cliente-servidor/server.js';
import net from 'net';

describe('Server', () => { 
    it("El servidor es capaz de emitir un evento al detectar un mensaje completo enviado a trozos", (done) => {
      const server = new Server(60305);
      const client = net.connect({port: 60305});
      server.on('request', (request, connection) => {
        expect(request).to.be.eql({'type': 'add', 'data': 'funko'});
        connection.end();
        server.server_.close();
        done();
      });
      client.write('{"type": "add", "data": "funko"}');
      client.write('\n');
  });
});