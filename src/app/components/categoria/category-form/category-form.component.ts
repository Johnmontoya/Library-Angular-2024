import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../interfaces/ICategoria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IValidationError } from '../../../interfaces/IValidationError';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnChanges{
  categoryForm: FormGroup;
  errorMessage: IValidationError[];
  name$: string;

  constructor(
    @Optional() private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ICategoria, errorMessage: IValidationError[], edit: string },
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      Id: [data.category.Id],
      Clave: [data.category.Clave, Validators.required],
      Nombre: [data.category.Nombre, Validators.required]
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
    const formData = this.categoryForm.value;
    if(this.categoryForm.valid) {
      this.dialogRef.close(formData)
    } else {
      this.categoryForm.markAllAsTouched();
    }   
  }

  close() {
    this.dialogRef.close();
  }
}
