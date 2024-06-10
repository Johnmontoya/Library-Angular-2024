import { Component, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/categoria/category-list/category-list.component';
import { ICategoria } from '../../interfaces/ICategoria';
import { CategoryFormComponent } from '../../components/categoria/category-form/category-form.component';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IValidationError } from '../../interfaces/IValidationError';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { AsyncPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastComponent } from '../../components/toast/toast.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CategoryListComponent,
    CategoryFormComponent,
    CommonModule,
    AsyncPipe,
    MatMenuModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  categoryService = inject(CategoriaService);
  matSnackBar = inject(MatSnackBar);
  categoria: ICategoria = {} as ICategoria;
  categorias$ = this.categoryService.selectCategorias();
  errors: IValidationError[] = [];
  isEditing: boolean = false;
  currentCategory: ICategoria | null = null;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        errorMessage: this.errors,
        category: this.isEditing
          ? this.currentCategory
          : { Clave: 0, Nombre: '' },
        edit: this.isEditing ? 'Actualizar Categoria' : 'Nueva Categoria',
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isEditing) {
          this.updateCategory(result);
        } else {
          this.createCategory(result, dialogRef);
        }
        this.isEditing = false;
      }
      this.isEditing = false;
    });    
  }

  setEditCategory(category: ICategoria) {
    console.log(category)
    this.isEditing = true;
    this.currentCategory = {
      Id: category.Id,
      Clave: category.Clave,
      Nombre: category.Nombre,
      LibrosCategoria: category.LibrosCategoria
    };
    this.openDialog();
  }

  createCategory(
    category: ICategoria,
    dialogRef: MatDialogRef<CategoryFormComponent>
  ) {
    this.categoryService.createCategoria(category).subscribe({
      next: (response: IApiResponse) => {
        this.categorias$ = this.categoryService.selectCategorias();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        dialogRef.close();
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          if (Array.isArray(err.error)) {
            this.errors = err.error;
          } else if (typeof err.error === 'object' && err.error.errors) {
            console.log(err.error.errors);
            this.errors = err.error.errors;
          } else {
            this.errors = [err.error];
          }
          this.matSnackBar.openFromComponent(ToastComponent, {
            duration: 5000,
            data: {
              message: this.errors,
            },
          });
        }
      },
      complete: () => {
        this.categoria = {} as ICategoria;
        this.matSnackBar.open('Categoria Guardada', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }

  updateCategory(category: ICategoria) {
    this.categoryService.updateCategoria(category).subscribe({
      next: (response: IApiResponse) => {
        this.categorias$ = this.categoryService.selectCategorias();
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

  deleteCategoria(category: ICategoria) {
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de querer eliminar la categoria ${category.Nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar la categoria',
    }).then((result) => {
      if (result.value) {
        this.categoryService.delete(category.Id).subscribe({
          next: (response: IApiResponse) => {
            this.categorias$ = this.categoryService.selectCategorias();
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
          icon: 'success',
        });
      }
    });
  }
}
