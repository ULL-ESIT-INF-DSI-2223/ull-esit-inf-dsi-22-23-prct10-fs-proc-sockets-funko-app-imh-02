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
import net from 'net';
import {MessageEventEmitterServer} from '../../src/modif/server-modif.js'

// describe('MessageEventEmitterServer', () => {
//   it('Should emit a message event once it gets a complete message', (done) => {
//     const server = new MessageEventEmitterServer(60302);
//     const client = net.connect({port: 60302});
//     server.on('command', (message, connection) => {
//       expect(message).to.be.eql({'command': 'cat', 'args': 'tests/modif/fichero-test.txt'});
//       connection.end();
//       done();
//     });

//     client.write(JSON.stringify({'command': 'cat', 'args': 'tests/modif/fichero-test.txt'}));
//     client.write('\n');
    
//   });
// });