import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../core/services/data/data.service';
import { Congregation } from '../../congregations/interfaces/congregation.interface';
import { CongregationsApiService } from '../../congregations/services/api/congregations.service';
import { Designation } from '../../designation/interfaces/designation.interface';
import { DesignationApiService } from '../../designation/services/api/designation-api.service';
import { UsersApiService } from '../services/api/users-api.service';

import { LocalStorageEnums } from '../../../../core/enums/localstorage.enum';
import { User } from '../interfaces/user.interface';
import { UsersDataService } from '../services/data/users-data.service';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
  standalone: true
})
export class UsersFormComponent implements OnInit {
  userForm!: FormGroup;
  congregations: Congregation[] = [];
  designations: Designation[] = []
  user!: User;
  @Output() onClose = new EventEmitter<void>();
  @Output() onUserCreated= new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private congregationsApiService: CongregationsApiService,
    private designationApiService: DesignationApiService,
    private usersApiService: UsersApiService,
    private dataService: DataService,
    private usersDataService: UsersDataService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(LocalStorageEnums.USER) || "")
    this.initializeForm()
    this.congregationsApiService.getAllCongregations$().subscribe(data => {
      this.congregations = data
    })
    this.designationApiService.getAllDesignations$().subscribe(data => {
      this.designations = data
    })
    this.user = JSON.parse(localStorage.getItem(LocalStorageEnums.USER) || "")
    this.subcriptions()
  }

  subcriptions() {
    this.usersDataService.getUser$().subscribe(data => {
      this.userForm.reset(data)
    })
  }

  initializeForm() {
    this.userForm = this.fb.group({
      fullName: [null],
      image: [''],
      firstName: [null, Validators.required],
      secondName: [''],
      lastName: [null, Validators.required],
      surname: [''],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      documentNumber: ['', [Validators.pattern(/^\d+$/)]],
      documentType: [''],
      cellPhone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      phone: [''],
      approved: [null],
      email: ['', [Validators.required, Validators.email]],
      congregation: [null, Validators.required],
      designations: [[]],
      createBy: [this.user.congregation],
      id: [null]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const body = this.userForm.getRawValue()
      body.createBy = this.user.congregation
      this.usersApiService.create$(body).subscribe(data => {
        if (body.id) {
          const message = { severity: 'contrast', summary: 'Actualización', detail: 'Publicador actualizado', life: 3000 }
          this.dataService.addToas$(message)
          this.usersDataService.setUser(data)

        } else {
          const message = { severity: 'contrast', summary: 'Registro', detail: 'Publicador registrado', life: 3000 }
          this.dataService.addToas$(message)
          this.userForm.reset()
          this.onUserCreated.emit();
        }
      }, error => {
        const message = { severity: 'warn', summary: 'Registro', detail: error.error.message, life: 3000 }
        this.dataService.addToas$(message)
      })
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  onDesignationChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const id = +input.value;
    const designation = this.designations.find(d => d.id === id);

    if (!designation) return;

    const current = this.userForm.value.designations ?? [];

    if (input.checked) {
      this.userForm.patchValue({
        designations: [...current, designation],
      });
    } else {
      this.userForm.patchValue({
        designations: current.filter((d: any) => d.id !== id),
      });
    }
  }

  isDesignationChecked(id: number): boolean {
    const designations = this.userForm.value.designations || [];
    return designations.some((d: any) => d.id === id);
  }

    onCancel() {
    this.onClose.emit();
   }
}
