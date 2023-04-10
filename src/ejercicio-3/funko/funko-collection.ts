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
import fs, { existsSync } from 'fs';
import { TiposFunko } from "./funko.js";
import { GeneroFunko } from "./funko.js";
import { json } from "stream/consumers";
import { Console } from "console";
import chalk from "chalk";

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
      if (fs.existsSync(path)) {
        console.log(chalk.green("Existe el directorio del usuario"));
        const ficherosFunkos = fs.readdirSync(path).toString().split(",");
        if (ficherosFunkos[0] !== '') {
          ficherosFunkos.forEach((funko) => {
            const data = fs.readFileSync(path + "/" + funko).toString();
            const jsonObject = JSON.parse(data);
            this.listaFunko.push(new Funko(jsonObject.id, jsonObject.nombre, jsonObject.descripcion, jsonObject.tipo, jsonObject.genero, jsonObject.franquicia, jsonObject.numeroFranquicia, jsonObject.exclusivo, jsonObject.caracteristicasEspeciales, jsonObject.valor));
          });
        }
      } else { // Si no existe el directorio del usuario lo crea
        fs.mkdirSync(path);
      }
  }

  /**
   * Método que añade un funko a la colección
   * @param newFunko Funko a añadir 
   * @returns Undefined en caso de ya existir el funko o la lista modificada en caso de añadirlo
   */
  addFunko(newFunko: Funko) {
    const path = "./db/" + this.nombreUsuario + "/" + newFunko.id + ".json";
    if(!fs.existsSync(path)) {
      fs.appendFileSync(path, newFunko.obtenerJSON());
      const jsonObject = JSON.parse(newFunko.obtenerJSON());
      this.listaFunko.push(new Funko(jsonObject.id, jsonObject.nombre, jsonObject.descripcion, jsonObject.tipo, jsonObject.genero, jsonObject.franquicia, jsonObject.numeroFranquicia, jsonObject.exclusivo, jsonObject.caracteristicasEspeciales, jsonObject.valor));
      console.log(chalk.green("Funko añadido"));
      return this.listaFunko;
    } else {
      console.log(chalk.red("Ya existe el funko con ese id"));
      return undefined;
    }

  }

  /**
   * Método que muestra un funko a partir de su id
   * @param id Id del funko a mostrar
   * @returns Undefined en caso de no existir el funko o el funko en caso de existir
   */
  getFunkoId(id: number) {
    const path = "./db/" + this.nombreUsuario + "/" + id + ".json";
    if(fs.existsSync(path)) {
      const funko = this.listaFunko.find((funko) => funko.id === id);
      funko?.imprimirFunko();
      return funko;
    } 
    console.log(chalk.red("El funko no existe"))
    return undefined;
  }

  /**
   * Método que elimina un funko a partir de su id
   * @param id Id del funko a eliminar
   * @returns Undefined en caso de no existir el funko o la lista modificada en caso de eliminarlo
   */
  eraseFunko(id: number) {
    const path = "./db/" + this.nombreUsuario + "/" + id + ".json";
    if(fs.existsSync(path)) {
      fs.rmSync(path)
      console.log(chalk.green("Funko eliminado"));
    } else {
      console.log(chalk.red("El funko no existe"));
      return undefined;
    }

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
    this.listaFunko.forEach((funko) => {
      funko.imprimirFunko();
    });
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
    if(fs.existsSync(path)) {
      this.eraseFunko(id);
      this.addFunko(modifiedFunko);
      console.log(chalk.green("Funko modificado"));
      return this.listaFunko;
    } else {
      console.log(chalk.red("El funko no existe"));
      return undefined;
    }
  }
}


 