import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Congregation } from './interfaces/congregation.interface';
import { CommonModule } from '@angular/common';
import { CongregationsApiService } from './services/api/congregations.service';
import { ToastModule } from 'primeng/toast';
import { DataService } from '../../../core/services/data/data.service';
import { Dialog } from 'primeng/dialog';
import { PointAddEditComponent } from "../points/point-add-edit/point-add-edit.component";
import { CongregationsFormAddEditComponent } from "./components/congregations-form-add-edit/congregations-form-add-edit.component";
import { CongregationsTableComponent } from "./components/congregations-table/congregations-table.component";
import { ButtonAddComponent } from "../../../shared/button-add/button-add.component";
import { CongregationDataService } from './services/data/congregation-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-congregations',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, Dialog, CongregationsFormAddEditComponent, CongregationsTableComponent, ButtonAddComponent],
  templateUrl: './congregations.component.html',
  styleUrl: './congregations.component.css',
  standalone: true
})
export class CongregationsComponent implements OnInit {
  congregationForm!: FormGroup;
  visible: boolean = false;
  visibleDelete: boolean = false;
  congregations: Congregation[] = [];
  constructor(
    private fb: FormBuilder,
    private congregationsApiService: CongregationsApiService,
    private dataService: DataService,
    private congregationDataService: CongregationDataService
  ) { }

  ngOnInit(): void {
    this.getAllCongregations()
  }

  getAllCongregations() {
    this.congregationsApiService.getAllCongregations$().subscribe(data => {
      this.congregations = data;
    })
  }



  onEdit(congregation: Congregation) {
    this.congregationDataService.setCongregation(congregation)
    this.visible = true;
  }
  onDelete(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-600 text-white p-4 rounded m-1 w-40 hover:cursor-pointer",
        cancelButton: "bg-blue-400 text-white p-4 rounded m-1 w-40 hover:cursor-pointer"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Desea eliminar la Congregacion?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Borrar",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.congregationsApiService.delete$(id).subscribe(data => {
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El registro fué eliminado",
            icon: "success"
          });
          this.getAllCongregations()
        })

      } else if (
        /* Read more about handling dismissals below */
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
