import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ILibro, ILibroResponse } from '../../../interfaces/ILibro';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './libro-list.component.html',
  styleUrl: './libro-list.component.scss'
})
export class LibroListComponent {
  @Input({ required: true }) libros!: ILibroResponse | null;
  @Output() deleteLibro: EventEmitter<ILibro> = new EventEmitter<ILibro>();
  @Output() updateLibro: EventEmitter<ILibro> = new EventEmitter<ILibro>();

  update(libro: ILibro) {
    this.updateLibro.emit(libro)
  }

  delete(libro: ILibro) {
    this.deleteLibro.emit(libro)
  }
}
