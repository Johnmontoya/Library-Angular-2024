export interface ICategoriaResponse {
  odata: string;
  value: Array<ListCategoria | null>;
}

export interface ListCategoria {
  Id: string;
  Clave: string;
  Nombre: string;
}
