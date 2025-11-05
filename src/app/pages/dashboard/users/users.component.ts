import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersApiService } from './services/api/users-api.service';
import { UsersFormComponent } from "./users-form/users-form.component";
import { ButtonAddComponent } from "../../../shared/button-add/button-add.component";
import { Dialog } from 'primeng/dialog';
import { User } from './interfaces/user.interface';
import { UsersTableComponent } from "./users-table/users-table.component";
import { UsersDataService } from './services/data/users-data.service';
import { UsersCredentialsComponent } from "./users-credentials/users-credentials.component";
import { UsersDeleteComponent } from "./users-delete/users-delete.component";
import { UsersApproverComponent } from "./users-approver/users-approver.component";
import { DataService } from '../../../core/services/data/data.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, UsersFormComponent, ButtonAddComponent, Dialog, UsersTableComponent, UsersCredentialsComponent, UsersDeleteComponent, UsersApproverComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true
})
export class UsersComponent implements OnInit {
  visible: boolean = false;
  visibleCredentials: boolean = false;
  visibleUserDelete: boolean = false;
  visibleUserApprover: boolean = false;
  users: User[] = [];
  constructor(
    private usersApiService: UsersApiService,
    private usersDataService: UsersDataService,
    private dataService: DataService,
  ) { }
  ngOnInit(): void {
    this.subcriptions()
    this.getAllUsers()
  }
  subcriptions() {
    this.usersDataService.getUser$().subscribe(data => {
      this.getAllUsers()
    }
    )
  }
  getAllUsers() {
    this.usersApiService.getAllUsers$().subscribe(data => {
      this.users = data
    })
  }
  updateTable() {
    this.getAllUsers()
  }
  onEdit(user: User) {
    this.usersDataService.setUser(user)
    this.visible = true;
  }
  onCredentials(user: User) {
    this.usersDataService.setUser(user)
    this.visibleCredentials = true;
  }
  onDelete(user: User) {
    this.usersDataService.setUser(user)
    this.visibleUserDelete = true;
  }
  toApprove(user: User) {
    this.usersDataService.setUser(user)
    this.visibleUserApprover = true;
  }
  toDisapprove(user: User) {
    this.usersDataService.setUser(user)
    this.visibleUserApprover = true;
  }
  onDeleted() {
    this.updateTable()
  }
  onUserCreated() {
    this.updateTable()
  }

  approveOrDesapprove(user: User) {
    this.usersApiService.userApproval$(user).subscribe(data => {
      console.info(data);
      this.updateTable()
      const message = { severity: 'contrast', summary: 'Actualización', detail: 'Publicador actualizado correctamente.', life: 3000 }
      this.dataService.addToas$(message)
    })
  }
}
