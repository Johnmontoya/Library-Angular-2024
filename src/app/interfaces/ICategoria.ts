export interface ICategoriaResponse {
  odata: string;
  value: Array<ICategoria | null>;
}

export interface ICategoria {
  Id: string;
  Clave: string;
  Nombre: string;
  LibrosCategoria: Array<ILibrosCategoria | null>;
}

export interface ILibrosCategoria {
  Id: string;
  Nombre: string;
  Editorial: string;
}