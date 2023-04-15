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

describe('Getter y setters de un Funko', () => {
  const harryPotter = new Funko(1, "Harry Potter", "Personaje Principal de la saga Harry Potter", TiposFunko.POP, GeneroFunko.PELICULAS, "Harry Potter", 1, false, "Cabeza balancea", 20);
  it("Getter del id resulta 1 ", () => {
    expect(harryPotter.id).to.be.eql(1);
  });

  it("Getter del nombre resulta 'Harry Potter' ", () => {
    expect(harryPotter.nombre).to.be.eql("Harry Potter");
  });
  
  it("Getter de la descripción resulta 'Personaje Principal de la saga Harry Potter' ", () => {
    expect(harryPotter.descripcion).to.be.eql("Personaje Principal de la saga Harry Potter");
  });

  it("Getter del tipo resulta Pop! ", () => {
    expect(harryPotter.tipo).to.be.eql(TiposFunko.POP);
  });

  it("Getter del género resulta Películas ", () => {
    expect(harryPotter.genero).to.be.eql(GeneroFunko.PELICULAS);
  });

  it("Getter de la franquicia resulta 'Harry Potter' ", () => {
    expect(harryPotter.franquicia).to.be.eql("Harry Potter");
  });

  it("Getter del número de franquicia resulta 1", () => {
    expect(harryPotter.numeroFranquicia).to.be.eql(1);
  });

  it("Getter de exclusivo resulta false ", () => {
    expect(harryPotter.exclusivo).to.be.eql(false);
  });

  it("Getter de la característica especial resulta 'Cabeza balancea' ", () => {
    expect(harryPotter.caracteristicasEspeciales).to.be.eql("Cabeza balancea");
  });

  it("Getter del valor resulta 20 ", () => {
    expect(harryPotter.valor).to.be.eql(20);
  });

  it("Setter del nombre resulta Capitan América ", () => {
    harryPotter.setnombre("Capitán América");
    expect(harryPotter.nombre).to.be.eql("Capitán América");
  });

  it("Setter del tipo resulta POPRIDES ", () => {
    harryPotter.setTipo(TiposFunko.POPRIDES);
    expect(harryPotter.tipo).to.be.eql(TiposFunko.POPRIDES);
  });

  it("Setter de la descripción resulta Personaje relevante en Marvel ", () => {
    harryPotter.setDescripcion("Personaje relevante en Marvel");
    expect(harryPotter.descripcion).to.be.eql("Personaje relevante en Marvel");
  });

  it("Setter del género resulta Animación ", () => {
    harryPotter.setGenero(GeneroFunko.ANIMACION);
    expect(harryPotter.genero).to.be.eql(GeneroFunko.ANIMACION);
  });

  it("Setter de la franquicia rresulta 'Marvel' ", () => {
    harryPotter.setFranquicia("Marvel")
    expect(harryPotter.franquicia).to.be.eql("Marvel");
  });

  it("Setter del número de franquicia resulta 2 ", () => {
    harryPotter.setNumeroFranquicia(2);
    expect(harryPotter.numeroFranquicia).to.be.eql(2);
  });

  it("Setter de exclusivo resulta true ", () => {
    harryPotter.setExclusivo(true);
    expect(harryPotter.exclusivo).to.be.eql(true);
  });

  it("Setter de las características especiales 'Tiene un escudo' ", () => {
    harryPotter.setCaracteristicasEspeciales("Tiene un escudo");
    expect(harryPotter.caracteristicasEspeciales).to.be.eql("Tiene un escudo");
  });

  it("Setter del valor devuelve 10 ", () => {
    harryPotter.setValor(10);
    expect(harryPotter.valor).to.be.eql(10);
  });

  it("Imprimir el funko ", () => {
    expect(harryPotter.imprimirFunko()).to.be.eql("ID: 1 Name: Capitán América Description: Personaje relevante en Marvel Type: POP!RIDES Genre: ANIMACION Franchise: Marvel Franchise number: 2 Exclusive: true Special features: Tiene un escudo Value: 10");
  });

  it("Imprimir un funko con valor magenta ", () => {
    const funkoMagenta = new Funko(1, "Harry Potter", "Personaje Principal de la saga Harry Potter", TiposFunko.POP, GeneroFunko.PELICULAS, "Harry Potter", 1, false, "Cabeza balancea", 40);
    expect(funkoMagenta.imprimirFunko()).to.be.eql("ID: 1 Name: Harry Potter Description: Personaje Principal de la saga Harry Potter Type: POP! Genre: PELICULAS Franchise: Harry Potter Franchise number: 1 Exclusive: false Special features: Cabeza balancea Value: 40");
  });


});