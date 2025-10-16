import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Stand } from '../../interfaces/stand.interface';
import { Congregation } from '../../../congregations/interfaces/congregation.interface';
import { CongregationsApiService } from '../../../congregations/services/api/congregations.service';
import { CongregationDataService } from '../../../congregations/services/data/congregation-data.service';
import { StandTypeEnum } from '../../enums/stands.types.enums';
import { StandStatusEnum } from '../../enums/status.enums';
import { StandApiService } from '../../services/api/stand-api.service';
import { DataService } from '../../../../../core/services/data/data.service';

@Component({
  selector: 'app-stand-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stand-add.component.html',
  styleUrl: './stand-add.component.css'
})
export class StandAddComponent implements OnInit {
  @Input() initialData?: Stand;
  @Input() points: { id: number, name: string }[] = [];

  @Output() formSubmit = new EventEmitter<Stand>();
  standTypes = Object.values(StandTypeEnum); // ['CARRITO', 'MESA', 'PORTATIL']
  StandStatus = Object.values(StandStatusEnum); // ['CARRITO', 'MESA', 'PORTATIL']
  standForm!: FormGroup;
  congregations: Congregation[] = []
  constructor(
    private fb: FormBuilder,
    private congregationsApiService: CongregationsApiService,
    private congregationDataService: CongregationsApiService,
    private standApiService: StandApiService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.standForm = this.fb.group({
      type: [null, Validators.required],
      status: [null, Validators.required],
      observations: [null],
      poster: [null],
      congregation: [null, Validators.required],
      point: [null]
    });
    this.congregationDataService.getAllCongregations$().subscribe(
      data => {
        this.congregations = data;
      }
    )
    this.congregationsApiService.getAllCongregations$().subscribe()
  }

  onSubmit(): void {
    if (this.standForm.valid) {
      const body = this.standForm.value;
      this.standApiService.create$(body).subscribe(data => {
        const message = { severity: 'contrast', summary: 'Guardar', detail: 'Datos Guardados', life: 3000 }
        this.dataService.addToas$(message)
      })
    } else {
      this.standForm.markAllAsTouched();
    }
  }
}
