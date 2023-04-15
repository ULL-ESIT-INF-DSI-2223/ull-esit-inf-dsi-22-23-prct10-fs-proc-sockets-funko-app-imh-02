/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Curso: 3º
 * Práctica 9: Registro de Funko Pops
 * @author Ismael Martín Herrera
 * @email alu0101397375@ull.edu.es
 * @date 27/03/2023
 */

import 'mocha';
import {expect} from 'chai';
import {Funko, TiposFunko, GeneroFunko} from '../../../src/ejercicio-3/funko/funko.js';
import {FunkoCollection} from '../../../src/ejercicio-3/funko/funko-collection.js';
import fs from 'fs';

describe('Métodos de una colección de Funkos', () => {
  const harryPotter = new Funko(1, "Harry Potter", "Personaje Principal de la saga Harry Potter", TiposFunko.POP, GeneroFunko.PELICULAS, "Harry Potter", 1, false, "Cabeza balancea", 20);
  const capitanAmerica = new Funko(2,"Capitan América", "Tiene un escudo que le da poder", TiposFunko.POP, GeneroFunko.PELICULAS, "Marvel", 1, false, "Fuerza", 5);
  const funkosCollection = new FunkoCollection("testDB");
  const SpiderMan = new Funko(3, "SpiderMan", "Es de color azul y rojo", TiposFunko.POP, GeneroFunko.ANIMACION, "SpiderMan", 3, false, "Puede crear telas de arañas", 55);
  
  it("Añadir nuevo Funko a la colleción resulta [harryPotter,capitanAmerica, SpiderMan]", () => {
    expect(funkosCollection.addFunko(SpiderMan)).to.be.eql([harryPotter, capitanAmerica, SpiderMan]);
  }); 

  it("Añadir nuevo Funko a la colleción resulta undefined porque ya estaba", () => {
    expect(funkosCollection.addFunko(SpiderMan)).to.be.eql(undefined);
  }); 

  it("Obtener el funko con id 3 resulta SpiderMan", () => {
    expect(funkosCollection.getFunkoId(3)).to.be.eql(SpiderMan);
  }); 

  it("Obtener el funko con id 4 resulta undefined", () => {
    expect(funkosCollection.getFunkoId(4)).to.be.eql(undefined);
  }); 

  it("Obtener todos los funkos resulta [harryPotter, capitanAmerica, SpiderMan]", () => {
    expect(funkosCollection.getAllFunkos()).to.be.eql([harryPotter, capitanAmerica, SpiderMan]);
  }); 

  it("Modificar el nombre de capitaAmerica por Capitan America modificado", () => {
    const capitanAmericaModif = new Funko(2,"Capitan América Modificado", "Tiene un escudo que le da poder", TiposFunko.POP, GeneroFunko.PELICULAS, "Marvel", 1, false, "Fuerza", 5);
    expect(funkosCollection.modifyFunko(2, capitanAmericaModif)).to.be.eql([harryPotter, SpiderMan, capitanAmericaModif]);
  }); 

  it("Modificar el funko 4 resulta undefined", () => {
    const capitanAmericaModif = new Funko(2,"Capitan América Modificado", "Tiene un escudo que le da poder", TiposFunko.POP, GeneroFunko.PELICULAS, "Marvel", 1, false, "Fuerza", 5);
    expect(funkosCollection.modifyFunko(4, capitanAmericaModif)).to.be.eql(undefined);
  }); 

  it("Eliminar el funko con id 2 resulta [harryPotter, SpiderMan]", () => {
    expect(funkosCollection.eraseFunko(2)).to.be.eql([harryPotter, SpiderMan]);
  }); 

  it("Eliminar el funko con id 4 resulta undefinee", () => {
    expect(funkosCollection.eraseFunko(4)).to.be.eql(undefined);
  }); 

  it("El usuario test2 no existe se crea", () => {
    const funkosCollection2 = new FunkoCollection("test2");
    expect(fs.existsSync("./db/test2")).to.be.eql(true);
    fs.rmdirSync("./db/test2");
  }); 

  funkosCollection.eraseFunko(3);
  funkosCollection.addFunko(capitanAmerica);
});