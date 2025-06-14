import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/api/auth.service';
import { Router } from '@angular/router';
import { RoutesEnums } from '../../core/enums/router.enums';
import { LocalStorageEnums } from '../../core/enums/localstorage.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpin = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.router.navigateByUrl(RoutesEnums.DASHBOARD)
  }
  public login() {
    this.showSpin =true
    const data = {
      username: "estarlin.elv@gmail.com",
      password: "181277"
    }
    this.authService.login(data).subscribe(data => {
      this.showSpin =false
      this.router.navigateByUrl(RoutesEnums.DASHBOARD)
      localStorage.setItem(LocalStorageEnums.USER, JSON.stringify(data.body))
    }, error =>{
      this.showSpin =false
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
