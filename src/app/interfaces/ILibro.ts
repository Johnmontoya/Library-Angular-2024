import { IAutor } from "./IAutor";

export interface ILibroResponse {
  odata: string;
  value: Array<ILibro | null>;
}

export interface ILibro {
  Id: string;
  CategoriaId: string;
  Nombre: string;
  Editorial: string;
  AutorId: string;
  Categoria: Categoria,
  Autor: IAutor
}

interface Categoria {
  Clave: number;
  Id: string;
  Nombre: string;
}