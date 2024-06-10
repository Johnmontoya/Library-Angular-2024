import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRole } from '../../interfaces/IRole';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { IValidationError } from '../../interfaces/IValidationError';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IRoleResponse } from '../../interfaces/IRoleResponse';
import Swal from 'sweetalert2';
import { RoleFormComponent } from '../../components/role/role-form/role-form.component';
import { RoleListComponent } from '../../components/role/role-list/role-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastComponent } from '../../components/UI/toast/toast.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    RoleFormComponent,
    RoleListComponent,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  authService = inject(AuthService);
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  role: IRole = {} as IRole;
  roles$ = this.roleService.getRoles();
  errors: IValidationError[] = [];
  isEditing: boolean = false;
  currentRole: IRole | null = null;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: {
        errorMessage: this.errors,
        role: this.isEditing
          ? this.currentRole
          : { roleName: '' },
        edit: this.isEditing ? 'Actualizar Rol' : 'Nuevo Rol'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if(this.isEditing) {
          this.updateRole(result);
        } else {
          this.createRole(result);
        }
        this.isEditing = false;
      }
      this.isEditing = false;
    });
  }

  setEditRole(role: IRoleResponse) {
    this.isEditing = true;
    this.currentRole = {
      id: role.id,
      roleName: role.name,
    };
    this.openDialog();
  }

  saveRole(role: IRole) {
    if(this.isEditing) {
      this.updateRole(role)
    } else {
      this.createRole(role)
    }
  }

  createRole(role: IRole) {
    this.roleService.createRole(role).subscribe({
      next: (response: IApiResponse) => {
        this.roles$ = this.roleService.getRoles();
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
          this.matSnackBar.openFromComponent(ToastComponent, {
            duration: 5000,
            data: {
              message: this.errors,
            },
          });
        }
      },
      complete: () => {
        this.role = {} as IRole;
        this.matSnackBar.open('Rol Guardado', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  } 

  updateRole(role: IRole) {
    this.roleService.updateRole(role).subscribe({
      next: (response: IApiResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.isEditing = false;
        this.role = {} as IRole;
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
          this.matSnackBar.openFromComponent(ToastComponent, {
            duration: 5000,
            data: {
              message: this.errors,
            },
          });
        }
      },
    });
  }

  deleteRole(role: IRoleResponse) {
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de querer eliminar el rol ${role.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar el rol',
    }).then((result) => {
      if(result.value) {
        this.roleService.delete(role.id).subscribe({
          next: (response: IApiResponse) => {
            this.roles$ = this.roleService.getRoles();
            this.matSnackBar.open(response.message, 'Close', {
              duration: 3000,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.openFromComponent(ToastComponent, {
              duration: 5000,
              data: {
                message: err.message,
              },
            });
          },
        });
        Swal.fire({
          title: 'Borrado',
          text: 'El rol ha sido eliminado',
          icon:'success'
        })
      }
    })    
  }
}
