import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../../core/services/data/data.service';
import { Congregation } from '../../interfaces/congregation.interface';
import { CongregationsApiService } from '../../services/api/congregations.service';

import { CongregationDataService } from '../../services/data/congregation-data.service';

@Component({
  selector: 'app-congregations-form-add-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './congregations-form-add-edit.component.html',
  styleUrl: './congregations-form-add-edit.component.css',
  standalone: true
})
export class CongregationsFormAddEditComponent implements OnInit {
  congregationForm!: FormGroup;
  visible: boolean = false;
  constructor(
    private fb: FormBuilder,
    private congregationsService: CongregationsApiService,
    private dataService: DataService,
    private congregationDataService: CongregationDataService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.suscriptions()
  }
  suscriptions() {
    this.congregationDataService.getCongregation$().subscribe(data => {
      if(data){
        this.congregationForm.reset(data)
      }
    })
  }
  initializeForm() {
    this.congregationForm = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  get name() {
    return this.congregationForm.get('name');
  }

  get number() {
    return this.congregationForm.get('number');
  }

  onSubmit(): void {
    if (this.congregationForm.valid) {
      const congregation: Congregation = this.congregationForm.value;
      this.congregationsService.create$(congregation).subscribe(data => {
        const message = { severity: 'contrast', summary: 'Guardar', detail: 'Datos Salvados', life: 3000 }
        this.dataService.addToas$(message)
        this.congregationForm.reset()
      }, error => {
        const message = { severity: 'danger', summary: 'Error', detail: 'Algo paso y no quedo registrada', life: 3000 }
        this.dataService.addToas$(message)
      })
    } else {
      this.congregationForm.markAllAsTouched();
    }
  }
}
