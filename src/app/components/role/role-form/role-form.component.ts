import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IValidationError } from '../../../interfaces/IValidationError';
import { IRole } from '../../../interfaces/IRole';


@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  @Input({ required: true }) role!: IRole;
  @Input() errorMessage!: IValidationError[];
  @Output() saveRole: EventEmitter<IRole> = new EventEmitter<IRole>();

  save() {
    this.saveRole.emit(this.role);
  }
}
