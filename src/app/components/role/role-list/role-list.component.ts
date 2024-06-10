import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IRoleResponse } from '../../../interfaces/IRoleResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActionCellComponent } from '../../UI/action-cell/action-cell.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIconModule, MatTableModule, ActionCellComponent],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
})
export class RoleListComponent implements OnChanges{
  @Input({ required: true }) roles!: IRoleResponse[] | null;
  @Output() deleteRole: EventEmitter<IRoleResponse> = new EventEmitter<IRoleResponse>();
  @Output() updateRole: EventEmitter<IRoleResponse> = new EventEmitter<IRoleResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'totalUsers','actions'];
  dataSource: MatTableDataSource<IRoleResponse> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['roles'] && this.roles) {
      this.dataSource.data = this.roles;
    }
  }

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  update(role: IRoleResponse) {
    this.updateRole.emit(role);
  }

  delete(role: IRoleResponse) {
    this.deleteRole.emit(role);
  }
}