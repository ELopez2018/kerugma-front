import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Stand } from '../../interfaces/stand.interface';

@Component({
  selector: 'app-stand-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stand-add.component.html',
  styleUrl: './stand-add.component.css'
})
export class StandAddComponent implements OnInit {
  @Input() initialData?: Stand;
  @Input() congregations: { id: number, name: string }[] = [];
  @Input() points: { id: number, name: string }[] = [];

  @Output() formSubmit = new EventEmitter<Stand>();

  standForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
