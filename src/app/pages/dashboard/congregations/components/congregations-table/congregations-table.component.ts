import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Congregation } from '../../interfaces/congregation.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-congregations-table',
  imports: [CommonModule],
  templateUrl: './congregations-table.component.html',
  styleUrl: './congregations-table.component.css',
  standalone: true
})
export class CongregationsTableComponent {
  @Input() congregations: Congregation[] = [];
  @Output() edit = new EventEmitter<Congregation>();
  @Output() delete = new EventEmitter<number>();

  onEdit(congregation: Congregation) {
    this.edit.emit(congregation);
  }

  onDelete(id: number = 0) {
    this.delete.emit(id);
  }
}
