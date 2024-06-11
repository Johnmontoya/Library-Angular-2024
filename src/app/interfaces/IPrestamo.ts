import { ILibro } from "./ILibro";

export interface IPrestamos {
    Id: string;
    IdEstudiante: string;
    IdLibro: string;
    FechaPrestamo: string;
    FechaDevolucion: string;
    Devuelto: boolean;
    Estudiante: Estudiante
    Libro: Libro
}

export interface Estudiante {
    Id: string;
    DNI: number;
    Direccion: string;
    Carrera: string;
    Edad: number;
    Activo: boolean;
}

export interface Libro {
    Id: string;
    CategoriaId: string;
    Nombre: string;
    Editorial: string;
    AutorId: string
  }