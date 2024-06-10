import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-action-cell',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIcon, CommonModule],
  templateUrl: './action-cell.component.html'
})
export class ActionCellComponent {
  @Input() row: any;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onUpdate() {
    this.update.emit(this.row);
  }

  onDelete() {
    this.delete.emit(this.row);
  }
}