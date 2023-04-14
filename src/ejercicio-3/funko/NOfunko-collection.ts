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


import { Funko } from "./funko.js";
import fs from 'fs';
// import { TiposFunko } from "./funko.js";
// import { GeneroFunko } from "./funko.js";
// import { json } from "stream/consumers";
// import { Console } from "console";
import chalk from "chalk";
import { log } from "console";

/**
 * Clase que representa una colección de funkos
 */
export class FunkoCollection {

  /**
   * Colleción de funkos del usuario
   */
  private listaFunko: Funko[] = []; 

  /**
   * Método constructor, a partir del nombre de usuario va a cargar todos sus funkos en una colección
   * @param nombreUsuario Nombre del usuario propiertario de la colección
   */
  constructor (private nombreUsuario: string) {
    let path = "./db/";
    path += nombreUsuario;
    fs.stat(path, (err) => {
      if(err) {
        console.log(chalk.red("No existe el directorio del usuario"));
        fs.mkdir(path, (err) => {
          if(err) {
            console.log(chalk.red("Error al crear el directorio del usuario"));
          }
        });
      } else {
        console.log(chalk.green("Existe el directorio del usuario"));
        fs.readdir(path, (err, files) => {
          if(err) {
            console.log(chalk.red("Error al leer el directorio del usuario"));
          } else {
            const ficherosFunkos = files.toString().split(",");
            if (ficherosFunkos[0] !== '') {
              const funkosList: Funko[] = [];
              ficherosFunkos.forEach((funko) => {

                fs.readFile(path + "/" + funko, (err, data) => {
                  if(err) {
                    console.log(chalk.red("Error al leer el funko"));
                  } else {
                    const jsonObject = JSON.parse(data.toString());
                    funkosList.push(new Funko(jsonObject.id, jsonObject.nombre, jsonObject.descripcion, jsonObject.tipo, jsonObject.genero, jsonObject.franquicia, jsonObject.numeroFranquicia, jsonObject.exclusivo, jsonObject.caracteristicasEspeciales, jsonObject.valor));
                    //console.log(chalk.green("Funko añadido"));
                    //console.log(this.listaFunko);
                  }
                });
              });
              this.listaFunko = funkosList;
              console.log(funkosList);

            }
          }
        });
      }
    });
  }

  /**
   * Método que añade un funko a la colección
   * @param newFunko Funko a añadir 
   * @returns Undefined en caso de ya existir el funko o la lista modificada en caso de añadirlo
   */
  addFunko(newFunko: Funko) {
    const path = "./db/" + this.nombreUsuario + "/" + newFunko.id + ".json";
    fs.stat(path, (err) => {
      if(err) {
        console.log(newFunko);
        fs.appendFile(path, newFunko.obtenerJSON(), (err) => {
          if(err) {
            console.log(chalk.red("Error al añadir el funko"));
          }
        });
        const jsonObject = JSON.parse(newFunko.obtenerJSON());
        this.listaFunko.push(new Funko(jsonObject.id, jsonObject.nombre, jsonObject.descripcion, jsonObject.tipo, jsonObject.genero, jsonObject.franquicia, jsonObject.numeroFranquicia, jsonObject.exclusivo, jsonObject.caracteristicasEspeciales, jsonObject.valor));
        console.log(chalk.green("Funko añadido"));
        return this.listaFunko;
      } else {
        console.log(chalk.red("El funko ya existe"));
        return undefined;
      }
    });
  }

  /**
   * Método que muestra un funko a partir de su id
   * @param id Id del funko a mostrar
   * @returns Undefined en caso de no existir el funko o el funko en caso de existir
   */
  getFunkoId(id: number){
    const path = "./db/" + this.nombreUsuario + "/" + id + ".json";
    let funkoReturn;
    fs.stat(path, (err) => {
      if(err) {
        console.log(chalk.red("El funko no existe"));
      } else {
        const funko = this.listaFunko.find((funko) => funko.id === id);
        funkoReturn = funko as Funko;
      }
    });
    return funkoReturn;
  }

  /**
   * Método que elimina un funko a partir de su id
   * @param id Id del funko a eliminar
   * @returns Undefined en caso de no existir el funko o la lista modificada en caso de eliminarlo
   */
  eraseFunko(id: number) {
    const path = "./db/" + this.nombreUsuario + "/" + id + ".json";
    fs.stat(path, (err) => {
      if(err) {
        console.log(chalk.red("El funko no existe"));
        //return undefined;
      } else {
        fs.rm(path, (err) => {
          if(err) {
            console.log(chalk.red("Error al eliminar el funko"));
          } else {
            console.log(chalk.green("Funko eliminado"));
          }
        });
      }
    });

    const result: Funko[] = [];
    this.listaFunko.forEach((element) => {
      if (element.id !== id) {
        result.push(element);
      }
    });
    this.listaFunko = result;

    return this.listaFunko;
  }

  /**
   * Método que muestra todos los funkos de la colección
   * @returns Lista de funkos
   */
  getAllFunkos() {
    console.log("Lista de funkos");
    console.log(this.listaFunko);
    return this.listaFunko;
  }

  /**
   * Método que modifica un funko a partir de su id
   * @param id Id del funko a modificar
   * @param modifiedFunko Funko modificado
   * @returns Undefined en caso de no existir el funko o la lista modificada en caso de modificarlo
   */
  modifyFunko(id: number, modifiedFunko: Funko) {
    const path = "./db/" + this.nombreUsuario + "/" + id + ".json";
    fs.stat(path, (err) => {
      if(err) {
        console.log(chalk.red("El funko no existe"));
        return undefined;
      } else {
        this.eraseFunko(id);
        this.addFunko(modifiedFunko);
        console.log(chalk.green("Funko modificado"));
        return this.listaFunko;
      }
    });
  }
}


 