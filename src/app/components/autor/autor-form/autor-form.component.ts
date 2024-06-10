import {
  Component,
  Inject,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { IAutor } from '../../../interfaces/IAutor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IValidationError } from '../../../interfaces/IValidationError';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.scss',
})
export class AutorFormComponent implements OnChanges {
  autorForm: FormGroup;
  errorMessage: IValidationError[];
  name$: string;

  constructor(
    @Optional() private dialogRef: MatDialogRef<AutorFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      autor: IAutor;
      errorMessage: IValidationError[];
      edit: string;
    },
    private fb: FormBuilder
  ) {
    this.autorForm = this.fb.group({
      Id: [data.autor.Id],
      Nombre: [data.autor.Nombre],
      Nacionalidad: [data.autor.Nacionalidad],
    });
    this.errorMessage = data.errorMessage;
    this.name$ = data.edit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.errorMessage = this.data.errorMessage || [];
    }
  }

  save() {
    const formData = this.autorForm.value;
    if (this.autorForm.valid) {
      this.dialogRef.close(formData);
    } else {
      this.autorForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
