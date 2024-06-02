import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces/ICategoria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IValidationError } from '../../../interfaces/IValidationError';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input({ required: true }) category!: ICategoria;
  @Input() errorMessage!: IValidationError[];
  @Output() addCategoria: EventEmitter<ICategoria> =
    new EventEmitter<ICategoria>();

  save() {
    this.addCategoria.emit(this.category);
  }
}
