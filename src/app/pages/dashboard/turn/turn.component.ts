import { Component } from '@angular/core';
import { Point } from '../points/interfaces/point.interfaces';
import { PointsService } from '../points/services/api/points.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { Dialog } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PointAddEditComponent } from '../points/point-add-edit/point-add-edit.component';
import { PointsCardComponent } from '../points/points-card/points-card.component';

@Component({
  selector: 'app-turn',
imports: [PointsCardComponent, CommonModule, CalendarModule, ReactiveFormsModule, FormsModule, RadioButtonModule],
  templateUrl: './turn.component.html',
  styleUrl: './turn.component.css'
})
export class TurnComponent  {
  title = "Mis Turnos"
  subtitle1 = "Escoje el Lugar de predicación"
  allPoints: Point[] = []
  pointSelected!: Point | null;
  dateSelected: Date | undefined | null;
  timeSelected: Date | undefined | null = null;
  timeAviables: any[] = []
  categories: any[] = [];
  selectedCategory: any;
  periodo: string | null = null;
  visible: boolean = false;
  constructor(private pointsService: PointsService) { }
  ngOnInit(): void {
    this.pointsService.getAllPoints$().subscribe(
      data => {
        this.allPoints = data
      }
    )
  }

  onPointSelected(pointSelected: Point) {
    this.pointSelected = pointSelected
    this.timeAviables =  pointSelected.schedule
  }
  back() {
    this.pointSelected = null
    this.dateSelected = null
    this.timeSelected = null
    this.periodo = null
  }
  getDiaSemana(fecha: any): string {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDay(); // 0 (domingo) - 6 (sábado)
    return diasSemana[dia];
  }


  marcarHorasBloqueadas(horas: string[], bloqueadas: string[]): { time: string, locked: boolean }[] {
    console.log(bloqueadas);
    console.log(horas);
    return horas.map(hora => ({
      time: hora,
      locked: bloqueadas.includes(hora)
    }));
  }


  getHora(fecha: any): string {
    const fechaObj = new Date(fecha);
    const horas = fechaObj.getHours().toString().padStart(2, '0');
    const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
    const segundos = fechaObj.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }
  generarHorasIntervalo(
    horaInicio: string,
    horaFin: string,
    minuto: string | number | null,
    periodo: number
  ): string[] {
    const resultado: string[] = [];

    const [hInicio, mInicio] = horaInicio.split(':').map(Number);
    const [hFin, mFin] = horaFin.split(':').map(Number);

    const minutos = minuto == null || minuto === '00' || minuto === 0 ? 0 : Number(minuto);

    const fechaInicio = new Date();
    const fechaFin = new Date();

    fechaInicio.setSeconds(0);
    fechaInicio.setMilliseconds(0);
    fechaFin.setSeconds(0);
    fechaFin.setMilliseconds(0);

    let horaActual = hInicio;

    while (horaActual + periodo <= hFin || (horaActual + periodo === hFin && minutos <= mFin)) {
      // Hora de inicio del rango
      fechaInicio.setHours(horaActual);
      fechaInicio.setMinutes(minutos);

      // Hora de fin del rango
      fechaFin.setHours(horaActual + periodo);
      fechaFin.setMinutes(minutos);

      const inicioFormateado = fechaInicio.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const finFormateado = fechaFin.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      resultado.push(`${inicioFormateado.toLowerCase()} - ${finFormateado.toLowerCase()}`);

      horaActual += periodo;
    }

    return resultado;
  }

  get disabled() {
    return this.pointSelected == null || this.timeSelected == null || this.dateSelected == null
  }

}
