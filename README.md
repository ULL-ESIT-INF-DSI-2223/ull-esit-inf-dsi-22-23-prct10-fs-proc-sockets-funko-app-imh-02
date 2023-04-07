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

[1]()


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