import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPrestamos, Libro } from '../../../interfaces/IPrestamo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ILibro } from '../../../interfaces/ILibro';
import { ActionCellComponent } from '../../UI/action-cell/action-cell.component';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, MatIconModule, MatButtonModule, ActionCellComponent],
  templateUrl: './prestamo-list.component.html',
  styleUrl: './prestamo-list.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrestamoListComponent implements OnChanges{
  @Input ({ required: true }) prestamos!: IPrestamos[] | null;
  columnsToDisplay = ['FechaPrestamo', 'FechaDevolucion', 'Devuelto'];
  columnsToDisplayWithExpand = ['Libro', 'expand', ...this.columnsToDisplay, 'actions'];
  expandedElement: Libro | null | undefined;
  dataSource: MatTableDataSource<IPrestamos> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['prestamos'] && this.prestamos){
      this.dataSource.data = this.prestamos;
    }
  }
}
