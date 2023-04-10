// import net from 'net';

// net.createServer((connection) => {
//   console.log('A client has connected.');

//   connection.write(`Connection established.`);

//   connection.on('close', () => {
//     console.log('A client has disconnected.');
//   });
// }).listen(60300, () => {
//   console.log('Waiting for clients to connect.');
// });

// import net from 'net';
// import {watchFile} from 'fs';

// if (process.argv.length !== 3) {
//   console.log('Please, provide a filename.');
// } else {
//   const fileName = process.argv[2];

//   net.createServer((connection) => {
//     console.log('A client has connected.');

//     connection.write(`Connection established: watching file ${fileName}.\n`);

//     watchFile(fileName, (curr, prev) => {
//       connection.write(`Size of file ${fileName} was ${prev.size}.\n`);
//       connection.write(`Size of file ${fileName} now is ${curr.size}.\n`);
//     });

//     connection.on('close', () => {
//       console.log('A client has disconnected.');
//     });
//   }).listen(60300, () => {
//     console.log('Waiting for clients to connect.');
//   });
// }

import net from 'net';
import {watchFile} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, provide a filename.');
} else {
  const fileName = process.argv[2];

  net.createServer((connection) => {
    console.log('A client has connected.');

    connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) +
      '\n');

    watchFile(fileName, (curr, prev) => {
      connection.write(JSON.stringify({
        'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
         '\n');
    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });
}