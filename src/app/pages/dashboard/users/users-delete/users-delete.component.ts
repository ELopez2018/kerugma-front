import { Component, EventEmitter, Output } from '@angular/core';
import { UsersDataService } from '../services/data/users-data.service';
import { UsersApiService } from '../services/api/users-api.service';
import { User } from '../interfaces/user.interface';
import { DataService } from '../../../../core/services/data/data.service';

@Component({
  selector: 'app-users-delete',
  imports: [],
  templateUrl: './users-delete.component.html',
  styleUrl: './users-delete.component.css',
  standalone: true
})
export class UsersDeleteComponent {
  user!: User
  @Output() onClose = new EventEmitter<void>();
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private usersDataService: UsersDataService, private usersApiService: UsersApiService, private dataService: DataService) {
    this.subcriptions()
  }
  subcriptions() {
    this.usersDataService.getUser$().subscribe(data => {
      this.user = data
    })
  }
  onConfirm() {
    this.usersApiService.userDelete$(this.user).subscribe(() => {
      const message = { severity: 'contrast', summary: 'Actualización', detail: 'Publicador eliminado', life: 3000 }
      this.dataService.addToas$(message)
      this.onDeleted.emit();
      this.onClose.emit();
    })
  }
  onCancel() {
    this.onClose.emit();
  }

}
