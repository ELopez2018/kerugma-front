import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PointStatusEnums } from '../enums/point-enums';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { LocalStorageEnums } from '../../../../core/enums/localstorage.enum';
import { PointsService } from '../services/api/points.service';
import { DataService } from '../../../../core/services/data/data.service';
import { User } from '../../users/interfaces/user.interface';
@Component({
  selector: 'app-point-add-edit',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, CalendarModule, TableModule, ToggleButtonModule],
  templateUrl: './point-add-edit.component.html',
  styleUrl: './point-add-edit.component.css',
  standalone: true
})
export class PointAddEditComponent implements OnInit {
  form!: FormGroup;
  hFrom: any = "";
  hTo: any = "";
  interval: number = 1;
  hlist: string[] = [];
  schedule: any[] = []
  step = 1;
  checked: any;
  user: any;
  stands: any[] = []
  alert = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaved = new EventEmitter<User>();
  constructor(
    private fb: FormBuilder,
    private pointsService: PointsService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', Validators.required],
      municipality: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      benchmark: ['', [Validators.required, Validators.maxLength(100)]],
      status: [PointStatusEnums.DESACTIVED, Validators.required],
      // pictures: ['img/cart.png', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i)]],
      pictures: ['img/cart.png', []],
      latitud: [4.985576, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: [-75.604152, [Validators.required, Validators.min(-180), Validators.max(180)]],
    });

    this.user = JSON.parse(localStorage.getItem(LocalStorageEnums.USER) || "")
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.generateHour()
    this.step = 2
    const body = this.form.getRawValue();
  }

  get f() {
    return this.form.controls;
  }
  /**
* Devuelve un arreglo de rangos de hora en formato
* "hh:mm a. m./p. m. - hh:mm a. m./p. m."
*
* @param horaInicio   Hora inicial  ─ ej. "08:00"
* @param horaFin      Hora final    ─ ej. "12:00"
* @param intervaloHrs Duración de cada rango en horas (ej. 2 == 2 h)
*/
  generarHorasIntervalo(
    horaInicio: string,
    horaFin: string,
    intervaloHrs: number
  ): string[] {
    const resultado: string[] = [];

    // ─── Convertir las horas a objetos Date ────────────────────────────────
    const [hInicio, mInicio] = horaInicio.split(':').map(Number);
    const [hFin, mFin] = horaFin.split(':').map(Number);

    const inicio = new Date();
    inicio.setHours(hInicio, mInicio, 0, 0);

    const finAbsoluto = new Date();
    finAbsoluto.setHours(hFin, mFin, 0, 0);

    // validación: inicio debe ser menor que fin
    if (inicio >= finAbsoluto) {
      this.alert = true
      console.warn('La hora de inicio debe ser menor que la hora fin.');
      return [];
    } else {
      this.alert = false
    }
    // Función de formateo a "08:00 a. m." / "02:30 p. m."
    const formato = (d: Date) =>
      d.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();

    // ─── Generar rangos mientras quepan completamente ─────────────────────
    let bloqueInicio = new Date(inicio);       // copia independiente

    while (true) {
      const bloqueFin = new Date(bloqueInicio);
      bloqueFin.setHours(bloqueFin.getHours() + intervaloHrs);

      if (bloqueFin > finAbsoluto) break;      // el rango ya no cabe completo

      resultado.push(`${formato(bloqueInicio)} - ${formato(bloqueFin)}`);

      // Avanzar al siguiente bloque
      bloqueInicio = bloqueFin;
    }

    return resultado;
  }

  generateHour() {
    console.log(this.hFrom, this.hTo);
    if (!this.interval || this.interval == 0) {
      this.interval = 1
    }
    if (!this.hFrom || !this.hTo) {
      return;
    }
    this.hlist = this.generarHorasIntervalo(this.hFrom, this.hTo, this.interval);
    this.schedule = this.hlist.map(h => ({ schedule: h, enable: true }))
  }
  save() {
    const body = {
      ...this.form.getRawValue(),
      stands: [],
      congregation: this.user.congregation,
      schedule: [
        ...this.schedule
      ]
    }
    this.pointsService.savePoint$(body).subscribe(data => {
      this.dataService.addToas$({ severity: 'contrast', summary: 'Guardar', detail: 'Punto guardado', life: 3000 })
      this.onSaved.emit();
    })
  }
  close(){
    this.onClose.emit();
  }
}
