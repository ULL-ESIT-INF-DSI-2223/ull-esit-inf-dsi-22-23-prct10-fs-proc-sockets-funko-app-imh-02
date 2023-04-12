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

## Ejercicios PE

## Conclusión

## Referencias