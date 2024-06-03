import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICategoriaResponse, ListCategoria } from '../../../interfaces/ICategoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {  
  @Input({ required: true }) categorias!: ICategoriaResponse | null;
  @Output() deleteCategory: EventEmitter<ListCategoria> = new EventEmitter<ListCategoria>();
  @Output() updateCategory: EventEmitter<ListCategoria> = new EventEmitter<ListCategoria>();
  
  update(category: ListCategoria) {
    this.updateCategory.emit(category)
  }

  delete(category: ListCategoria) {
    this.deleteCategory.emit(category)
  }
}
