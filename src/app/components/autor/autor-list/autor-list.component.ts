import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IAutor } from '../../../interfaces/IAutor';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActionCellComponent } from '../../action-cell/action-cell.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-autor-list',
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
  templateUrl: './autor-list.component.html',
  styleUrl: './autor-list.component.scss',
})
export class AutorListComponent implements OnChanges, AfterViewInit{
  @Input({ required: true }) autores!: IAutor[] | null;
  @Output() deleteAutor: EventEmitter<IAutor> = new EventEmitter<IAutor>();
  @Output() updateAutor: EventEmitter<IAutor> = new EventEmitter<IAutor>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['books', 'Nombre', 'Nacionalidad', 'actions'];
  dataSource: MatTableDataSource<IAutor> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {   
    this.dataSource.paginator = this.paginator;  
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['autores'] && this.autores) {
      this.dataSource.data = this.autores;
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

  update(autor: IAutor) {
    this.updateAutor.emit(autor);
  }

  delete(autor: IAutor) {
    this.deleteAutor.emit(autor);
  }
}
