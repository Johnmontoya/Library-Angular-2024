import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y'; // Asegúrate de que la interfaz ICategoria esté correctamente importada
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICategoria } from '../../../interfaces/ICategoria';
import { ActionCellComponent } from '../../action-cell/action-cell.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    ActionCellComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) categorias!: ICategoria[] | null;
  @Output() deleteCategory: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() updateCategory: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['books', 'Clave', 'Nombre', 'actions'];
  dataSource: MatTableDataSource<ICategoria> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias'] && this.categorias) {
      this.dataSource.data = this.categorias;
      if(this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if(this.sort) {
        this.dataSource.sort = this.sort;
      }
    }    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  update(category: ICategoria) {
    this.updateCategory.emit(category);
  }

  delete(category: ICategoria) {
    this.deleteCategory.emit(category);
  }
}
