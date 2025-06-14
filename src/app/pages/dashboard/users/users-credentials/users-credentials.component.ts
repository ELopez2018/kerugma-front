import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../core/services/data/data.service';
import { UsersApiService } from '../services/api/users-api.service';
import { UsersDataService } from '../services/data/users-data.service';
import { CreateCredential, User } from '../interfaces/user.interface';

@Component({
  selector: 'app-users-credentials',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-credentials.component.html',
  styleUrl: './users-credentials.component.css',
  standalone: true
})
export class UsersCredentialsComponent implements OnInit {
  credentialForm!: FormGroup;
  user!: User;
  constructor(
    private fb: FormBuilder,
    private usersApiService: UsersApiService,
    private dataService: DataService,
    private usersDataService: UsersDataService
  ) { }

  ngOnInit(): void {
    this.credentialForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      locked: [false],
      disabled: [false],
    });

    this.usersDataService.getUser$().subscribe(data => {
      this.user = data
    })
  }



  onSubmit(): void {
    if (this.credentialForm.valid) {
      const body: CreateCredential = {
        ... this.credentialForm.value,
        user: this.user
      }
      // Aquí se procesa la información del formulario
      console.log(body);
    } else {
      // Se marcan todos los controles como tocados para mostrar las validaciones
      this.credentialForm.markAllAsTouched();
    }
  }
}
