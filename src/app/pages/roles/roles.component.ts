import { Component, inject } from '@angular/core';
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
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { RoleFormComponent } from '../../components/role-form/role-form.component';
import { IRoleResponse } from '../../interfaces/IRoleResponse';
import Swal from 'sweetalert2';

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
          this.matSnackBar.open('Error de validacion', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
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

  setEditRole(role: IRoleResponse) {
    this.role = {
      id: role.id,
      roleName: role.name,
    };
    this.isEditing = true;
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
          this.matSnackBar.open('Error de validacion', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
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
            this.matSnackBar.open(err.message, 'Close', {
              duration: 3000,
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
