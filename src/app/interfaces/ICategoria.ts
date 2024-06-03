export interface ICategoriaResponse {
  odata: string;
  value: Array<ListCategoria | null>;
}

export interface ListCategoria {
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

export interface ICategoria {
  id: string;
  clave: number;
  nombre: string;
}
