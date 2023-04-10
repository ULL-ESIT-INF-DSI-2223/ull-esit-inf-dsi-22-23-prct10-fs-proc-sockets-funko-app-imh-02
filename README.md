# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js

Ismael Martín Herrera  *alu0101397375@ull.edu.es*

## Índice

1. [Introducción](#introducción)
2. [Ejercicio 1](#ejercicio-1)
3. [Ejercicio 2](#ejercicio-2)
4. [Ejercicio 3](#ejercicio-3)
5. [Conclusión](#conclusión)
6. [Referencias](#referencias)

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

## Ejercicio 3

## Conclusión

## Referencias