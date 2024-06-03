import { Component, inject } from '@angular/core';
import { LibroFormComponent } from '../../components/libro/libro-form/libro-form.component';
import { LibroListComponent } from '../../components/libro/libro-list/libro-list.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LibroService } from '../../services/libro.service';
import { ILibro } from '../../interfaces/ILibro';
import { IValidationError } from '../../interfaces/IValidationError';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [LibroFormComponent, LibroListComponent, CommonModule, AsyncPipe],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss',
})
export class LibroComponent {
  libroService = inject(LibroService);
  matSnackBar = inject(MatSnackBar);
  libro: ILibro = {} as ILibro;
  libros$ = this.libroService.getLibros();
  errors: IValidationError[] = [];
  isEditing: boolean = false;

  saveLibro(libro: ILibro) {
    if (this.isEditing) {
      this.updateLibro(libro)
    } else {
      this.createLibro(libro)
    }
  }

  setEditLibro(libro: ILibro) {
    this.libro = {
      Id: libro.Id,
      CategoriaId: libro.CategoriaId,
      Nombre: libro.Nombre,
      Editorial: libro.Editorial,
      AutorId: libro.AutorId,
      Categoria: libro.Categoria,
      Autor: libro.Autor
    };
    this.isEditing = true;
  }

  createLibro(libro: ILibro){
    this.libroService.createLibro(libro).subscribe({
      next: (response: IApiResponse) => {
        this.libros$ = this.libroService.getLibros();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          if (Array.isArray(err.error)) {
            this.errors = err.error;
          } else if (typeof err.error === 'object' && err.error.errors) {
            this.errors = err.error.errors;
          } else {
            this.errors = [err.error];
          }
          this.matSnackBar.open('Error de validacion', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => {
        this.libro = {} as ILibro;
        this.matSnackBar.open('Libro Guardado', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    })
  }

  updateLibro(libro: ILibro) {
    this.libroService.updateLibro(libro).subscribe({
      next: (response: IApiResponse) => {
        this.libros$ = this.libroService.getLibros();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.isEditing = false;
        this.libro = {} as ILibro;
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          if (Array.isArray(err.error)) {
            this.errors = err.error;
          } else if (typeof err.error === 'object' && err.error.errors) {
            this.errors = err.error.errors;
          } else {
            this.errors = [err.error];
          }
          this.matSnackBar.open('Error de validacion', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
    });
  }

  deleteLibro(libro: ILibro) {
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de querer eliminar el libro ${libro.Nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar el libro',
    }).then((result) => {
      if(result.value) {
        this.libroService.delete(libro.Id).subscribe({
          next: (response: IApiResponse) => {
            this.libros$ = this.libroService.getLibros();
            this.matSnackBar.open(response.message, 'Close', {
              duration: 3000,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(err.message, 'Close', {
              duration: 3000,
            });
          },
        });
        Swal.fire({
          title: 'Borrado',
          text: 'El libro ha sido eliminado',
          icon:'success'
        })
      }
    })    
  }
}
