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
import {spawn} from 'child_process';

export class MessageEventEmitterServer extends EventEmitter {
  public server_: net.Server;
  private port_: number;
  constructor(port: number) {
    super();
    this.port_ = port;
    this.server_ = net.createServer((connection) => {
      console.log('A client has connected.');
      connection.write(JSON.stringify({'type': 'established'}));
      let wholeData = '';
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk;
        let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) { 
          wholeData = wholeData.substring(0, messageLimit);
          this.emit('command', JSON.parse(wholeData), connection);
          messageLimit = wholeData.indexOf('\n');
          wholeData = '';
        }
      });

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });

    }).listen(this.port_, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  command() {
    this.on('command', (message, connection) => {
      console.log(`Comando a ejecutar ${message.command}`);
      const command = spawn(message.command, message.args);
      command.on('error', () => {
        connection.write(JSON.stringify({'type': 'salida', 'salida': 'Error en el comando'}))
      });
      command.stdout.on('data', (content) =>{
        connection.write(JSON.stringify({'type': 'salida', 'salida': content.toString()}))
      });
      command.stderr.on('data', (content) =>{
        connection.write(JSON.stringify({'type': 'error', 'salida': content.toString()}))
      });
      connection.end();
    });
  }
}



