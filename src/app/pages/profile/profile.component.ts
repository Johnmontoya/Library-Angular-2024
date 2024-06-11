import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogComponent } from '../../components/form/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { IEstudiante } from '../../interfaces/IEstudiante';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { IValidationError } from '../../interfaces/IValidationError';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDivider],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  estudianteService = inject(EstudianteService);
  accountDetail$ = this.authService.getDetail();
  errors: IValidationError[] = []

  constructor(public dialog: MatDialog){}

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.saveData(result);
      }
    })
  }

  saveData(data: IEstudiante): void {
    this.createEstudiante(data)
  }

  createEstudiante(estudiante: IEstudiante){
    this.estudianteService.createEstudiante(estudiante).subscribe({
      next: (response: IApiResponse) => {
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
        this.matSnackBar.open('Datos de estudiante guardardos', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    })
  }
}
