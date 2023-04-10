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


import chalk from "chalk";

/**
 * Enumerado que representa los tipos de Funko
 */
export enum TiposFunko {
  POP = "POP!",
  POPRIDES = "POP!RIDES",
  VYNILSODA = "Vynil Soda",
  VYNILGOLD = "Vynil Gold",
}


/**
 * Enumerado que representa los géneros de Funko
 */ 
export enum GeneroFunko {
  ANIMACION = "ANIMACION",
  PELICULAS = "PELICULAS",
  TV = "TV",
  VIDEOJUEGOS = "VIDEOJUEGOS",
  DEPORTES = "DEPORTES",
  MUSICA = "MUSICA",
  ANIME = "ANIME",
}

/**
 * Clase que representa a un Funko
 */
export class Funko {
  /**
   * Constructor de un Funko
   * @param id Identificador único del funko
   * @param nombre Nombre del funko
   * @param tipo Tipo de funko Pop!, Pop! Rides, Vynil Soda o Vynil Gold
   * @param genero Género del funco (Animación, Películas, TV, videojuegos, deportes, música o anime)
   * @param franquicia Franquicia a la que pertenece por ejemplo Marvel o The Big Ban Theory
   * @param numeroFranquicia Número identificativo del Funko dentro de la franquicia correspondiente
   * @param exclusivo Verdadero en caso de que el funko sea exclusivo
   * @param caracteristicasEspeciales String indicando la característica especial
   * @param valor Valor númerico positivo en el mercado
   */
  constructor(
    private id_: number,
    private nombre_: string,
    private descripcion_: string,
    private tipo_: TiposFunko,
    private genero_: GeneroFunko,
    private franquicia_: string,
    private numeroFranquicia_: number,
    private exclusivo_: boolean,
    private caracteristicasEspeciales_: string,
    private valor_: number
  ) {}
  
  /**
   * Método para establecer el nombre de un Funko 
   * @param nombre Nombre del funko
   */
  setnombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método para establecer el tipo de un Funko
   * @param tipo Tipo de funko Pop!, Pop! Rides, Vynil Soda o Vynil Gold
   */
  setTipo(tipo: TiposFunko) {
    this.tipo_ = tipo;
  }

  /**
   * Método para establecer la descripción de un Funko
   * @param descripcion Descripción del Funko
   */
  setDescripcion(descripcion: string) {
    this.descripcion_ = descripcion;
  }

  /**
   * Método para establecer el género de un Funko
   * @param genero Género del funco (Animación, Películas, TV, videojuegos, deportes, música o anime)
   */
  setGenero(genero: GeneroFunko) {
    this.genero_ = genero;
  }

  /**
   * Método para establecer la franquicia de un Funko
   * @param franquicia Franquicia a la que pertenece por ejemplo Marvel o The Big Ban Theory
   */
  setFranquicia(franquicia: string) {
    this.franquicia_ = franquicia;
  }

  /**
   * Método para establecer el número de franquicia de un Funko
   * @param numeroFranquicia Número identificativo del Funko dentro de la franquicia correspondiente
   */
  setNumeroFranquicia(numeroFranquicia: number) {
    this.numeroFranquicia_ = numeroFranquicia;
  }

  /**
   * Método para establecer si un Funko es exclusivo o no
   * @param excluviso Verdadero en caso de que el funko sea exclusivo
   */
  setExclusivo(excluviso: boolean) {
    this.exclusivo_ = excluviso;
  }

  /**
   * Método para establecer las características especiales de un Funko
   * @param caracteristicasEspeciales String indicando la característica especial
   */
  setCaracteristicasEspeciales(caracteristicasEspeciales: string) {
    this.caracteristicasEspeciales_ = caracteristicasEspeciales;
  }

  /**
   * Método para establecer el valor de un Funko
   * @param valor Valor númerico positivo en el mercado
   */
  setValor(valor: number ){
    this.valor_ = valor;
  }

  /**
   * Método para obtener el identificador de un Funko
   */
  get id(): number {
    return this.id_;
  }

  /**
   * Método para obtener el nombre de un Funko
   */
  get nombre(): string {
    return this.nombre_;
  }

  /**
   * Método para obtener el tipo de un Funko
   */
  get tipo(): TiposFunko {
    return this.tipo_;
  }

  /**
   * Método para obtener la descripción de un Funko
   */
  get descripcion(): string {
    return this.descripcion_;
  }

  /**
   * Método para obtener el género de un Funko
   */
  get genero(): GeneroFunko {
    return this.genero_;
  }

  /**
   * Método para obtener la franquicia de un Funko
   */
  get franquicia(): string {
    return this.franquicia_;
  }

  /**
   * Método para obtener el número de franquicia de un Funko
   */
  get numeroFranquicia(): number {
    return this.numeroFranquicia_;
  }

  /**
   * Método para obtener si un Funko es exclusivo o no
   */
  get exclusivo(): boolean {
    return this.exclusivo_;
  }

  /**
   * Método para obtener las características especiales de un Funko
   */
  get caracteristicasEspeciales(): string {
    return this.caracteristicasEspeciales_;
  }

  /**
   * Método para obtener el valor de un Funko
   */
  get valor(): number {
    return this.valor_;
  }

  /**
   * Método para obtener un objeto JSON con los datos del Funko
   * @returns Devuelve un objeto JSON con los datos del Funko
   */
  obtenerJSON() {
    const data = {
      id: this.id_,
      nombre: this.nombre_,
      descripcion: this.descripcion_,
      tipo: this.tipo_,
      genero: this.genero_,
      franquicia: this.franquicia_,
      numeroFranquicia: this.numeroFranquicia_,
      exclusivo: this.exclusivo_,
      caracteristicasEspeciales: this.caracteristicasEspeciales_,
      valor: this.valor_
    }
    return JSON.stringify(data);
  }

  /**
   * Método para imprimir por consola los datos del Funko
   * @returns Devuelve un string con los datos del Funko
   */
  imprimirFunko() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.nombre}`);
    console.log(`Description: ${this.descripcion}`);
    console.log(`Type: ${this.tipo}`);
    console.log(`Genre: ${this.genero}`);
    console.log(`Franchise: ${this.franquicia}`);
    console.log(`Franchise number: ${this.numeroFranquicia}`);
    console.log(`Exclusive: ${this.exclusivo}`);
    console.log(`Special features: ${this.caracteristicasEspeciales}`);
    const log = console.log;
    if (this.valor < 10) {
      log(chalk.red(`Value: ${this.valor}`));
    } else if (this.valor >= 10 && this.valor < 30) {
      log(chalk.blue(`Value: ${this.valor}`));
    } else if (this.valor >= 30 && this.valor < 50) {
      log(chalk.magenta(`Value: ${this.valor}`));
    } else {
      log(chalk.green(`Value: ${this.valor}`));
    }
    
    console.log("------------------------------------------");
    return "ID: " + this.id + " Name: " + this.nombre + " Description: " + this.descripcion + " Type: " + this.tipo + " Genre: " + this.genero + " Franchise: " + this.franquicia + " Franchise number: " + this.numeroFranquicia + " Exclusive: " + this.exclusivo + " Special features: " + this.caracteristicasEspeciales + " Value: " + this.valor;
  }
}
