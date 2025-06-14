import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stand } from './interfaces/stand.interface';
import { ButtonAddComponent } from '../../../shared/button-add/button-add.component';
import { StandAddComponent } from './components/stand-add/stand-add.component';
import { Dialog } from 'primeng/dialog';
import { StandApiService } from './services/api/stand-api.service';

@Component({
  selector: 'app-stand',
  imports: [CommonModule, ButtonAddComponent, StandAddComponent, Dialog],
  templateUrl: './stand.component.html',
  styleUrl: './stand.component.css',
  standalone: true,
  schemas: [ NO_ERRORS_SCHEMA]
})
export class StandComponent implements OnInit {
  @Input() initialData?: Stand;
  @Input() congregations: { id: number, name: string }[] = [];
  @Input() points: { id: number, name: string }[] = [];

  @Output() formSubmit = new EventEmitter<Stand>();

  standForm!: FormGroup;
  visible = false;
  stands: Stand[]=[];
  constructor(
    private fb: FormBuilder,
    private standApiService: StandApiService
    ) {}

  ngOnInit(): void {
    this.initialiceForm()
    this.getAllStands()
  }

  getAllStands(){
    this.standApiService.getAllStands$().subscribe(data=>{
      this.stands = data;
    })
  }

  initialiceForm(){
    this.standForm = this.fb.group({
      type: [this.initialData?.type || '', Validators.required],
      status: [this.initialData?.status || '', Validators.required],
      observations: [this.initialData?.observations || ''],
      poster: [this.initialData?.poster || ''],
      enable: [this.initialData?.enable ?? true],
      congregation: [this.initialData?.congregation || '', Validators.required],
      point: [this.initialData?.point || '']
    });
  }

  onSubmit(): void {
    if (this.standForm.valid) {
      this.formSubmit.emit(this.standForm.value);
    } else {
      this.standForm.markAllAsTouched();
    }
  }
}
