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

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, UsersFormComponent, ButtonAddComponent, Dialog, UsersTableComponent, UsersCredentialsComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true
})
export class UsersComponent implements OnInit {
  visible: boolean = false;
  visibleCredentials: boolean = false;
  users: User[] = [];
  constructor(
    private usersApiService: UsersApiService,
    private usersDataService: UsersDataService
  ) { }
  ngOnInit(): void {
    this.getAllUsers()
  }
  subcriptions(){

  }
  getAllUsers() {
    this.usersApiService.getAllUsers$().subscribe(data => {
      this.users = data
    })
  }
  updateTable() {
    console.log("onHide");
    this.getAllUsers()
  }
  onEdit(user: User){
    this.usersDataService.setUser(user)
    this.visible = true;
  }

  onCredentials(user: User){
    console.log("user credentials");
    this.usersDataService.setUser(user)
     this.visibleCredentials = true;
  }
}

