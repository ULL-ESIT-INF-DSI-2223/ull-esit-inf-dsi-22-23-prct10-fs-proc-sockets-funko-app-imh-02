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

if (process.argv.length < 3) {
    console.log(`Debe introducir un comando como argumento`);
} else {
    const client = net.connect({port: 60300});
    client.on('data', (dataJSON) => {
        const message = JSON.parse(dataJSON.toString());
        
        if (message.type === 'established') {
            console.log(`Conexión establecida con el servidor`);
            const command = process.argv[2];
            const args: string[] = [];
            if(process.argv.length > 3) {
                for(let i = 3; i < process.argv.length; ++i) {
                    args.push(process.argv[i]);
                }
            }
            client.write(JSON.stringify({'command': command, 'args': args}) + '\n');
        } else if (message.type === 'salida') {
            console.log(message.salida);
        } else if (message.type === 'error') {
            console.log(message.salida);
        }
    });

    client.on('end', () => {
        console.log('Comunicación cerrada');
    });
}
