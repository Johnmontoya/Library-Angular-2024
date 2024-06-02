import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/categoria/category-list/category-list.component';
import { ICategoria } from '../../interfaces/ICategoria';
import { CategoryFormComponent } from '../../components/categoria/category-form/category-form.component';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IValidationError } from '../../interfaces/IValidationError';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ICategoriaResponse, ListCategoria } from '../../interfaces/ICategoriaResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CategoryListComponent, CategoryFormComponent, CommonModule, AsyncPipe],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent implements OnInit{  
  categoryService = inject(CategoriaService);
  matSnackBar = inject(MatSnackBar);
  categoria: ICategoria = {} as ICategoria;
  categorias$ = this.categoryService.getCategorias();
  listCategorias$: any
  errors: IValidationError[] = [];
  isEditing: boolean = false;

  saveCategory(categoria: ICategoria) {
    if(this.isEditing){
      this.updateCategory(categoria)
    } else {
      this.createCategory(categoria)
    }
  }

  setEditCategory(category: ListCategoria) {
    this.categoria = {
      id: category.Id,
      clave: parseInt(category.Clave),
      nombre: category.Nombre
    };
    this.isEditing = true;
  }

  ngOnInit(): void {
    this.categoryService.getCategorias().subscribe((data) => {
      this.listCategorias$ = data.value
    })
  }  

  createCategory(category: ICategoria){
    this.categoryService.createCategoria(category).subscribe({
      next: (response: IApiResponse) => {
        this.categorias$ = this.categoryService.getCategorias();
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
        this.categoria = {} as ICategoria;
        this.matSnackBar.open('Categoria Guardada', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    })
  }

  updateCategory(category: ICategoria) {
    this.categoryService.updateCategoria(category).subscribe({
      next: (response: IApiResponse) => {
        this.categorias$ = this.categoryService.getCategorias();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.isEditing = false;
        this.categoria = {} as ICategoria;
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

  deleteCategoria(category: ListCategoria) {
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de querer eliminar la categoria ${category.Nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar el rol',
    }).then((result) => {
      if(result.value) {
        this.categoryService.delete(category.Id).subscribe({
          next: (response: IApiResponse) => {
            this.categorias$ = this.categoryService.getCategorias();
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
          text: 'La categoria ha sido eliminada',
          icon:'success'
        })
      }
    })    
  }
}
