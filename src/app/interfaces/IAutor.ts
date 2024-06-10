export interface IAutorResponse {
  odata: string;
  value: Array<IAutor | null>;
}

export interface IAutor {
  Id: string;
  Nombre: string;
  Nacionalidad: string;
  LibrosEscritos: Array<ILibrosEscritos | null>
}

export interface ILibrosEscritos {
  Id: string;
  Nombre: string;
  Editorial: string;
}