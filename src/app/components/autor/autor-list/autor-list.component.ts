import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAutor, IAutorResponse } from '../../../interfaces/IAutor';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './autor-list.component.html',
  styleUrl: './autor-list.component.scss',
})
export class AutorListComponent {
  @Input({ required: true }) autores!: IAutorResponse | null;
  @Output() deleteAutor: EventEmitter<IAutor> = new EventEmitter<IAutor>();
  @Output() updateAutor: EventEmitter<IAutor> = new EventEmitter<IAutor>();

  update(autor: IAutor) {
    this.updateAutor.emit(autor)
  }
  
  delete(autor: IAutor) {
    this.deleteAutor.emit(autor);
  }
}
