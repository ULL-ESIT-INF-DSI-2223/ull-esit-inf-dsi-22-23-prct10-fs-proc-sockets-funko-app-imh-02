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

// import 'mocha';
// import {expect} from 'chai';
// import {Client} from '../../src/ejercicio-3/cliente-servidor/client.js';
// import {Server} from '../../src/ejercicio-3/cliente-servidor/server.js';

// describe('MessageEventEmitterClient', () => {
//   it('Should emit a message event once it gets a complete message', (done) => {
//     const client = new Client();
//     client.on('response', (message) => {
//       expect(message).to.be.eql({'type': 'list', 'success': true});
//       done();
//     });

//     client.getClient().emit('data', '{"type": "list", "success": true');
//     client.getClient().emit('data', '}\n');
//   });
// });