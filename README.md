# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js

Ismael Martín Herrera  *alu0101397375@ull.edu.es*

## Índice

1. [Introducción](#introducción)
2. [Ejercicio 1](#ejercicio-1)
3. [Ejercicio 2](#ejercicio-2)
4. [Ejercicio 3](#ejercicio-3)
5. [Ejercicios PE](#ejercicios-pe)
6. [Conclusión](#conclusión)
7. [Referencias](#referencias)

## Introducción

## Ejercicio 1

```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

**Traza de ejecución**

La ejecución comienza añadiendo en la pila de llamadas ``` console.log(`Starting to watch file ${filename}`)```, puesto que ya existe el fichero sobre el que se quiere poner atención, en este sentido la salida por la consola es ```Starting to watch file file.txt```. A continuación, en la pila de llamadas se añade el ```watcher```, este elemento contiene un manejador que se ejecuta cada vez que sucede un determinado evento.  En este sentido, el siguiente paso consiste en añadir ```watcher.on``` al registro de eventos, una vez que ```watcher.on``` está en el registro de eventos este tiene como objetivo "observar" los cambios en el citado fichero, por tanto, cada vez que se realiza una modificación sobre el fichero se cumple el evento. Posteriormente, sin haber realizado aún ninguna modificación en el fichero se introduce en la pila de llamadas ``` console.log(`File ${filename} is no longer watched`);```, y por consiguiente al ejecutarse y ser extraído de la pila, se muestra por la consola ```File file.txt is no longer watched```. A continuación, al realizar la primera modificación en el fichero, se emite un evento ```chage``` detectado por ```watcher.on``` con lo que se añade el correspondiente ```console.log(`File ${filename} has been modified somehow`);``` a la cola de manejadores. En este sentido, el ```bucle de eventos``` es el encargado de mover los manejadores a la pila de llamadas, siempre que la pila de llamadas esté vacía. Por tanto, en este caso, como la pila está vacía se añade ```console.log(`File ${filename} has been modified somehow`);```, con lo que se imprime por consola ```File file.txt has been modified somehow```. Cabe añadir que en el registro de evento se sigue a la espera que otra posible modificación del fichero. Finalmente, se vuelve a modificar el fichero y sucede el mismo proceso anterior, expuesto al modificar el fichero. Cabe añadir que el programa no acaba nunca de ejecutarse debido a que el ```watcher```, continua siempre "observando" el fichero. 

### ¿Qué hace la función access?

La función ```access()``` prueba si el usuario tiene permisos para abrir el archivo o directorio especificado. A la citada función se le pasan los siguientes argumentos: 

```access(path, mode, callback)```

- ```path```: se corresponde con la ruta del archivo o directorio.
- ```mode```: entero opcional que especifica las comprobaciones de accesibilidad que se realizarán.
- ```callback```: función que se invoca en caso de error de alguna de las comprobaciones. 

### ¿Para qué sirve el objeto constants?

Devuelve un objeto que contiene constantes de uso común para las operaciones del sistema de archivos.

## Ejercicio 2

El ejercico 2 pedía desarrollar una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. En este sentido, había que realizar dos desarrollos de la misma aplicación, uno de ellos utilizando el método ```pipe```: 

```ts
export function fileInfo(fileName: string,linesNumber: boolean, wordsNumber: boolean, charsNumber: boolean) {
  if (linesNumber === true) {
    const lines = spawn( 'grep', ['-c', '^', fileName]);
    lines.stdout.pipe(process.stdout);
  }
  if (wordsNumber === true) {
    const fileContent = spawn('cat', [fileName]);
    const wc = spawn('wc', ['-w']);
    fileContent.stdout.pipe(wc.stdin);
    wc.stdout.pipe(process.stdout);
  }
  if (charsNumber === true) {
    const fileContent = spawn('cat', [fileName]);
    const wc = spawn('wc', ['-c']);
    fileContent.stdout.pipe(wc.stdin);
    wc.stdout.pipe(process.stdout);
  }
}
```

En este primer desarrollo, en el caso del recuento de líneas he usado el comando ```grep``` puesto que devuelve el número de líneas exacto, en el caso de ```wc``` devolvería una línea menos. Por otra parte, para contar el número de palabras y el número de caracteres he usado el comando cat, y a continuación he redigido su salida a la entrada estándar del comando ```wc```. 

Por otra parte, también se pedía realizar el mismo desarrollo pero sin usar el citado método ```pipe```, por lo que he seguido una estrategia basada en la creación de subprocesos y sus correspondiente manejadores, así como el uso del método ```write``` de un ```stream```. 

```ts
export function fileInfo(fileName: string,linesNumber: boolean, wordsNumber: boolean, charsNumber: boolean) {
  if (linesNumber === true) {
    const lines = spawn( 'grep', ['-c', '^', fileName]);
    let linesOutput = 0;
    lines.stdout.on('data', (info) => linesOutput = info);
    lines.on('close', () => { // Manejador
      console.log(`Número de líneas: ${linesOutput}`);
    });
  }
  if (wordsNumber === true) {
    const cat = spawn('cat', ['src/ejercicio-1/file.txt']);
    
    cat.stdout.on('data', (data) => {
      const wc = spawn('wc', ['-w']);
      wc.stdin.write(data);
      wc.stdin.end();
      wc.stdout.on('data', (data) => {
        console.log(`Número de palabras: ${data}`);
      }); 
    });
  }
  if (charsNumber === true) {
    const cat = spawn('cat', ['src/ejercicio-1/file.txt']);
  
    cat.stdout.on('data', (data) => {
      const wc = spawn('wc', ['-c']);
      wc.stdin.write(data);
      wc.stdin.end();
      wc.stdout.on('data', (data) => {
        console.log(`Número de caracteres: ${data}`);
      }); 
    });
  }
}
```

Finalmente, tal y como pedía el enunciado he realizado una implementación de entrada por comandos mediante el paquete ```yargs```, que es igual para ambos casos, tanto con ```pipe``` como sin dicho método. 

```ts
export function commandInterface() {
  const commands = hideBin(process.argv);

  yargs(commands)
  .command('info', 'Obtein file info', {
  file: {
   description: 'file',
   type: 'string',
   demandOption: true
  },
  l: {
    description: 'lines',
    demandOption: false
  },
  w: {
    description: 'words',
    demandOption: false
  },
  c: {
    description: 'chars',
    demandOption: false
  }
 }, (argv) => {
  let lines = false;
  let words = false;
  let chars = false;
  if (argv.l) {
    lines = true;
  }
  if(argv.w) {
    words = true;
  }
  if(argv.c) {
    chars = true;
  }
   fileInfo(argv.file, lines, words, chars);
 })
 .help()
 .argv;
}

commandInterface();
```

## Ejercicio 3

En el ejercicio 3 se pide la creación de una aplicación para el almacenamiento de funkos, basado en la pŕactica anterior, pero siguiendo el modelo ```cliente-servidor```. En este sentido, he desarrollado dos clases que heredan de ```EventEmiter``` para poder emitir eventos tanto en el servidor como en el cliente, esto con el objetivo de emitir una evento cada vez que se detecte un mensaje completo. En relación a la detección de mensajes completos, he seguido el mismo "protocolo" que se usa en los apuntes, es decir, considerar un mensaje acabado al encontrar un '\n'. 

```ts
export class Client extends EventEmitter {
  private client: net.Socket;
  private commands: string[];

  constructor() {
    super();
    this.client = connect({port: 60301});
    this.commands = hideBin(process.argv);
    this.add();
    this.list();
    this.read();
    this.update();
    this.remove();
    let wholeData = '';
    this.client.on('data', (dataChunk) => {
      wholeData += dataChunk;
      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) { 
        wholeData = wholeData.substring(0, messageLimit);
        this.emit('response', JSON.parse(wholeData));
        messageLimit = wholeData.indexOf('\n');
      }
      wholeData = '';
    });

    this.client.on('end', () => {
      console.log('Connection closed');
    });
  }

  ...
```
*Parte de la clase Client*

```ts
export class Server extends EventEmitter {
  constructor() {
    super();
    net.createServer((connection) => {
      console.log('A client has connected.');

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

}
```

Además de crear las clases expuestas previamente, también he creado dos tipos para "estandarizar" las comunicaciones ```cliente-servidor```. Por un lado, el tipo ```ResponseType```, para las respuestas del servidor a las peticiones del cliente. 

```ts
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkoPops?: Funko;
  funkoPopsList?: Funko[];
}
```

Y por otro lado, el tipo ```RequestType```, para las peticiones del cliente al servidor. 

```ts
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user?: string
  funkoPop?: string
  id?: number
}
```

Finalmente, también se pedía cambiar la lógica de gestión de ficheros de la API síncrona de Node JS a la asíncrona. Sin embargo, tras intentarlo no he conseguido hacerlo, puesto que a la hora de leer un directorio de un usuario y tratar de leer cada uno de sus ficheros para crear los funkos y guardarlos en un array, las operaciones se realizaban pero, el array realmente se queda ```undefined```. En el directorio correspondiente al código de los Funkos se encuentra un fichero ```async-funko-collection``` con el código asíncrono que he intetando implementar. 

## Ejercicios PE

El enunciado del ejercicio de la sesión PE es el siguiente: 

```
Desarrolle los siguientes ejercicios en un proyecto alojado en un nuevo repositorio de GitHub:

    Desarrolle un cliente y un servidor en Node.js, haciendo uso de sockets, que incorporen la siguiente funcionalidad:
        - El cliente debe recibir, desde la línea de comandos, un comando Unix/Linux, además de sus argumentos correspondientes, que ejecutaremos en el servidor.
        - El servidor debe recibir la petición del cliente, procesarla, esto es, ejecutar el comando solicitado, y devolver la respuesta del comando al cliente. Para ello, piense que el comando solicitado puede haberse ejecutado correctamente o puede haber fallado, por ejemplo, por no existir o porque se le han pasado unos argumentos no válidos.
    Trate de definir pruebas con Mocha y Chai que comprueben el funcionamiento de los métodos que ha implementado. Tenga en cuenta que, lo ideal, es que utilice el patrón callback para implementar dichos métodos, dado que lo anterior facilitará el desarrollo de las pruebas.
    Incorpore un flujo de GitHub que ejecute sus pruebas en diferentes entornos con diferentes versiones de Node.js.
```

Y el código que he desarrollado es el siguiente: 

```ts
if (process.argv.length < 3) {
    console.log(`Debe introducir un comando como argumento`);
} else {
    const client = net.connect({port: 60301});
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
```
*Código del cliente*

```ts
export class MessageEventEmitterServer extends EventEmitter {
  constructor(port: number) {
    super();
    net.createServer((connection) => {
      console.log('A client has connected.');
      connection.write(JSON.stringify({'type': 'established'}));
      let wholeData = '';
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk;
        let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) { 
          wholeData = wholeData.substring(0, messageLimit);
          console.log(wholeData);
          this.emit('command', JSON.parse(wholeData), connection);
          messageLimit = wholeData.indexOf('\n');
        }
      });
    }).listen(port, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}
```
*Clase para el servidor, heredando de EventEmitter*


```ts
server.on('command', (message, connection) => {
  console.log(`Comando a ejecutar ${message.command}`);
  const command = spawn(message.command, message.args);
  command.on('error', () => {
    connection.write(JSON.stringify({'type': 'salida', 'salida': 'Error en el comando'}))
    connection.end();
  });
  command.stdout.on('data', (content) =>{
    connection.write(JSON.stringify({'type': 'salida', 'salida': content.toString()}))
    connection.end();
  });
  command.stderr.on('data', (content) =>{
    connection.write(JSON.stringify({'type': 'error', 'salida': content.toString()}))
    connection.end();
  });
});
```
*Manejador del evento del servidor*

## Conclusión

En conclusión, en esta prácticas he profundizado más en la creación de una aplicación siguiendo el modelo ```cliente-servidor```. Además, de entender y utilizar la creación de procesos hijos en ```TypeScript```. Sin embargo, la parte de realizar el código de los ficheros asíncrono me ha sido bastante complicada, así como también realizar test para este tipo de código. 

## Referencias

[1 Guión de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct10-fs-proc-sockets-funko-app/)