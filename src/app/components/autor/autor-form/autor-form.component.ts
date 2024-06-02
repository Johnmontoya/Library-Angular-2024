import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAutor } from '../../../interfaces/IAutor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IValidationError } from '../../../interfaces/IValidationError';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.scss',
})
export class AutorFormComponent {
  @Input({ required: true }) autor!: IAutor;
  @Input() errorMessage!: IValidationError[];
  @Output() addAutor: EventEmitter<IAutor> = new EventEmitter<IAutor>();

  save() {
    this.addAutor.emit(this.autor);
  }
}
