import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stand } from './interfaces/stand.interface';
import { ButtonAddComponent } from '../../../shared/button-add/button-add.component';
import { StandAddComponent } from './components/stand-add/stand-add.component';
import { Dialog } from 'primeng/dialog';
import { StandApiService } from './services/api/stand-api.service';
import { StandSetPointComponent } from './components/stand-set-point/stand-set-point.component';
import { StandSetInventoryComponent } from "./components/stand-set-inventory/stand-set-inventory.component";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-stand',
  imports: [CommonModule, ButtonAddComponent, StandAddComponent, Dialog, StandSetPointComponent, StandSetInventoryComponent],
  templateUrl: './stand.component.html',
  styleUrl: './stand.component.css',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA]
})
export class StandComponent implements OnInit {
  @Input() initialData?: Stand;
  @Input() congregations: { id: number, name: string }[] = [];
  @Input() points: { id: number, name: string }[] = [];

  @Output() formSubmit = new EventEmitter<Stand>();

  standForm!: FormGroup;
  visible = false;
  visibleSetPoint = false;
  visibleSeInventory = false;

  stands: Stand[] = [];
  standSelected!: Stand;
  constructor(
    private fb: FormBuilder,
    private standApiService: StandApiService
  ) { }

  ngOnInit(): void {
    this.initialiceForm()
    this.getAllStands()
  }

  getAllStands() {
    this.standApiService.getAllStands$().subscribe(data => {
      this.stands = data;
    })
  }

  initialiceForm() {
    this.standForm = this.fb.group({
      type: [this.initialData?.type || '', Validators.required],
      status: [this.initialData?.status || '', Validators.required],
      observations: [this.initialData?.observations || ''],
      poster: [this.initialData?.poster || ''],
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
  setPoint(item: Stand) {
    this.visibleSetPoint = true
    this.standSelected = item
  }
  setInventory(item: Stand) {
    this.visibleSeInventory = true
    this.standSelected = item
  }
  onDelete(item: Stand) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-600 text-white p-4 rounded m-1 w-40 hover:cursor-pointer",
        cancelButton: "bg-blue-400 text-white p-4 rounded m-1 w-40 hover:cursor-pointer"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Desea eliminar el stand # ${item.id}?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Borrar",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.standApiService.delete$(item).subscribe({
          next: () => {
            Swal.fire(
              "Eliminado!",
              `El stand # ${item.id} ha sido eliminado.`,
              "success"
            );
            this.getAllStands();
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se cancelo la eliminación",
          icon: "error"
        });
      }
    });
  }
}
