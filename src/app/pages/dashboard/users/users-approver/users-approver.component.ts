import { Component, EventEmitter, Output } from '@angular/core';
import { UsersDataService } from '../services/data/users-data.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-users-approver',
  imports: [],
  templateUrl: './users-approver.component.html',
  styleUrl: './users-approver.component.css'
})
export class UsersApproverComponent {
  user!: User;
  message: string = 'Aprobar';
  @Output() onClose = new EventEmitter<void>();
  @Output() onApproveOrDesapprove= new EventEmitter<User>();
  constructor(private usersDataService: UsersDataService) {
    this.subcriptions()
  }
  subcriptions() {
    this.usersDataService.getUser$().subscribe(data => {
      this.user = data
      this.message = this.user.approved ? 'eliminar la aprobación' : 'aprobar'
    })
  }
  onConfirm() {
    this.onApproveOrDesapprove.emit(this.user);
    this.onClose.emit();
   }
  onCancel() {
    this.onClose.emit();
  }
}
