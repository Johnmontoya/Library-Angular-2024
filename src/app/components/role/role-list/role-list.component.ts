import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IRoleResponse } from '../../../interfaces/IRoleResponse';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
})
export class RoleListComponent {
  @Input({ required: true }) roles!: IRoleResponse[] | null;
  @Output() deleteRole: EventEmitter<IRoleResponse> = new EventEmitter<IRoleResponse>();
  @Output() updateRole: EventEmitter<IRoleResponse> = new EventEmitter<IRoleResponse>();

  update(role: IRoleResponse) {
    this.updateRole.emit(role);
  }

  delete(role: IRoleResponse) {
    this.deleteRole.emit(role);
  }
}