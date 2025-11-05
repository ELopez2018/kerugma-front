import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../core/services/data/data.service';
import { UsersApiService } from '../services/api/users-api.service';
import { UsersDataService } from '../services/data/users-data.service';
import { CreateCredential, User } from '../interfaces/user.interface';
import { MessageService } from 'primeng/api';

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
  error!: string | null;
   @Output() onClose = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private usersApiService: UsersApiService,
    private dataService: DataService,
    private usersDataService: UsersDataService,
  ) { }

  ngOnInit(): void {
    this.credentialForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      locked: [false],
      disabled: [false],
    });

    this.usersDataService.getUser$().subscribe(data => {
      this.user = data
    })
  }



  onSubmit(): void {
    this.error= null
    if (this.credentialForm.valid) {
      const body: CreateCredential = {
        ... this.credentialForm.value,
        user: this.user
      }
      this.usersApiService.createCredentials$(body).subscribe
      (data=>{console.log(data)}, error=>{
        this.error = error.error.error
        console.error(error.error.error);
      })
      // Aquí se procesa la información del formulario
      console.log(body);
    } else {
      // Se marcan todos los controles como tocados para mostrar las validaciones
      this.credentialForm.markAllAsTouched();
    }
  }
    onCancel() {
    this.onClose.emit();
   }
}
