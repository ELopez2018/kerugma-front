import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../interfaces/user.interface';


@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  @Output() onMakeCredentials = new EventEmitter<User>();
  @Output() onApprove = new EventEmitter<User>();
  @Output() onDisapprove = new EventEmitter<User>();

  onEdit(user: User) {
    this.edit.emit(user);
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }

  onCredentials(user: User) {
    this.onMakeCredentials.emit(user);
  }

  onToApprove(user: User) {
    this.onApprove.emit(user);
  }
  onToDisapprove(user: User) {
    this.onDisapprove.emit(user);
  }
}
