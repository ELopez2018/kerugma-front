import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();
  @Output() onMakeCredentials = new EventEmitter<User>();

  onEdit(user: User) {
    this.edit.emit(user);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onCredentials(user: User){
   this.onMakeCredentials.emit(user);
  }
}
