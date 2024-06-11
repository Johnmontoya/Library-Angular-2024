import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ILibro } from '../../../interfaces/ILibro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActionCellComponent } from '../../UI/action-cell/action-cell.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ActionCellComponent,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './libro-list.component.html',
  styleUrl: './libro-list.component.scss',
})
export class LibroListComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) libros!: ILibro[] | null;
  @Output() deleteLibro: EventEmitter<ILibro> = new EventEmitter<ILibro>();
  @Output() updateLibro: EventEmitter<ILibro> = new EventEmitter<ILibro>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'Categoria',
    'Nombre',
    'Editorial',
    'Autor',
    'actions',
  ];
  dataSource: MatTableDataSource<ILibro> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libros'] && this.libros) {
      this.dataSource.data = this.libros;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      if(this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  update(libro: ILibro) {
    this.updateLibro.emit(libro);
  }

  delete(libro: ILibro) {
    this.deleteLibro.emit(libro);
  }
}
