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
import {Client} from '../../../src/ejercicio-3/cliente-servidor/client.js';
import net from 'net';

describe('Cliente', () => {
    it("El cliente es capaz de emitir un evento al recibir una respuesta por trozo", (done) => {
      const socket = new net.Socket();
      const client = new Client(socket);
      client.on('response', (response) => {
        expect(response).to.be.eql({'type': 'add', 'success': false});
        done();
      });
      socket.emit('data', '{"type": "add", "success": false}');
      socket.emit('data', '\n');
    });
});