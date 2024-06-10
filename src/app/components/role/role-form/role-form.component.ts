import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IValidationError } from '../../../interfaces/IValidationError';
import { IRole } from '../../../interfaces/IRole';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
})
export class RoleFormComponent implements OnChanges {
  roleForm: FormGroup;
  errorMessage: IValidationError[];
  name$: string;

  constructor(
    @Optional() private dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      role: IRole;
      errorMessage: IValidationError[];
      edit: string;
    },
    private fb: FormBuilder
  ) {
    this.roleForm = this.fb.group({
      id: [data.role.id],
      roleName: [data.role.roleName],
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
    const formData = this.roleForm.value;
    if (this.roleForm.valid) {
      this.dialogRef.close(formData);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
