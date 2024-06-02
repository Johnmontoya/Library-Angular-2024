import { Component, inject } from '@angular/core';
import { AutorService } from '../../services/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAutor } from '../../interfaces/IAutor';
import { IValidationError } from '../../interfaces/IValidationError';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AutorListComponent } from '../../components/autor/autor-list/autor-list.component';
import { AutorFormComponent } from '../../components/autor/autor-form/autor-form.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [AutorListComponent, AutorFormComponent, AsyncPipe, CommonModule],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.scss'
})
export class AutorComponent {
  autorService = inject(AutorService);
  matSnackBar = inject(MatSnackBar);
  autor: IAutor = {} as IAutor;
  autores$ = this.autorService.getAutors();
  errors: IValidationError[] = [];
  isEditing: boolean = false;

  saveAutor(autor: IAutor) {
    if(this.isEditing) {
      this.updateAutor(autor)
    } else {
      this.createAutor(autor)
    }
  }

  setEditAutor(autor: IAutor) {
    this.autor = {
      Id: autor.Id,
      Nombre: autor.Nombre,
      Nacionalidad: autor.Nacionalidad
    };
    this.isEditing = true;
  }

  createAutor(autor: IAutor){
    this.autorService.createAutor(autor).subscribe({
      next: (response: IApiResponse) => {
        this.autores$ = this.autorService.getAutors();
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
        this.autor = {} as IAutor;
        this.matSnackBar.open('Autor Guardado', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    })
  }

  updateAutor(autor: IAutor) {
    this.autorService.updateAutor(autor).subscribe({
      next: (response: IApiResponse) => {
        this.autores$ = this.autorService.getAutors();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.isEditing = false;
        this.autor = {} as IAutor;
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

  deleteAutor(autor: IAutor) {
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de querer eliminar al autor ${autor.Nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar el autor',
    }).then((result) => {
      if(result.value) {
        this.autorService.delete(autor.Id).subscribe({
          next: (response: IApiResponse) => {
            this.autores$ = this.autorService.getAutors();
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
          text: 'El autor ha sido eliminado',
          icon:'success'
        })
      }
    })    
  }
}
