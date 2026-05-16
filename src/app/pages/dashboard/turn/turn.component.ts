import { Component, inject } from "@angular/core";
import { Point } from "../points/interfaces/point.interfaces";
import { PointsService } from "../points/services/api/points.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { Dialog } from "primeng/dialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { PointAddEditComponent } from "../points/point-add-edit/point-add-edit.component";
import { PointsCardComponent } from "../points/points-card/points-card.component";
import { ErrorRequest, TurnRequestDTO, type InventoryType } from "../../../core/interfaces/interfaces";
import { User } from "../users/interfaces/user.interface";
import { UsersDataService } from "../users/services/data/users-data.service";
import { TurnService } from "./core/service/api/turn.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-turn",
  imports: [PointsCardComponent, CommonModule, CalendarModule, ReactiveFormsModule, FormsModule, RadioButtonModule],
  templateUrl: "./turn.component.html",
  styleUrl: "./turn.component.css",
})
export class TurnComponent {
  title = "Mis Turnos";
  subtitle1 = "Escoje el Lugar de predicación";
  allPoints: Point[] = [];
  pointSelected!: Point | null;
  dateSelected: Date | undefined | null;
  timeSelected: any = null;
  timeAviables: any[] = [];
  categories: any[] = [];
  selectedCategory: any;
  periodo: string | null = null;
  visible: boolean = false;
  user: User | undefined | null = null;
  inventoryType!: InventoryType;
  private pointsService = inject(PointsService);
  private usersDataService = inject(UsersDataService);
  private turnService = inject(TurnService);
  constructor() {}
  ngOnInit(): void {
    this.pointsService.getAllPoints$().subscribe((data) => {
      this.allPoints = data;
    });

    this.usersDataService.getUser$().subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = JSON.parse(localStorage.getItem("user") || "null");
      }
    });
  }

  onPointSelected(pointSelected: Point) {
    this.pointSelected = pointSelected;
    this.timeAviables = pointSelected.schedule;
  }
  back() {
    this.pointSelected = null;
    this.dateSelected = null;
    this.timeSelected = null;
    this.periodo = null;
  }
  getDiaSemana(fecha: any): string {
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDay(); // 0 (domingo) - 6 (sábado)
    return diasSemana[dia];
  }

  marcarHorasBloqueadas(horas: string[], bloqueadas: string[]): { time: string; locked: boolean }[] {
    return horas.map((hora) => ({
      time: hora,
      locked: bloqueadas.includes(hora),
    }));
  }

  getHora(fecha: any): string {
    const fechaObj = new Date(fecha);
    const horas = fechaObj.getHours().toString().padStart(2, "0");
    const minutos = fechaObj.getMinutes().toString().padStart(2, "0");
    const segundos = fechaObj.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  }
  generarHorasIntervalo(horaInicio: string, horaFin: string, minuto: string | number | null, periodo: number): string[] {
    const resultado: string[] = [];

    const [hInicio, mInicio] = horaInicio.split(":").map(Number);
    const [hFin, mFin] = horaFin.split(":").map(Number);

    const minutos = minuto == null || minuto === "00" || minuto === 0 ? 0 : Number(minuto);

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

      const inicioFormateado = fechaInicio.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const finFormateado = fechaFin.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      resultado.push(`${inicioFormateado.toLowerCase()} - ${finFormateado.toLowerCase()}`);

      horaActual += periodo;
    }

    return resultado;
  }

  get disabled() {
    return this.pointSelected == null || this.timeSelected == null || this.dateSelected == null;
  }

  submitRequest() {
    const { timeStart, timeEnd } = this.parseTimeRange(`${this.timeSelected.schedule}`);
    const request: TurnRequestDTO = {
      date: formatToYYYYMMDD(`${this.dateSelected}`), // formato: yyyy-MM-dd
      timeStart: timeStart, // formato: HH:mm:ss
      timeEnd: timeEnd, // formato: HH:mm:ss
      status: "Active",
      observations: "",
      placements: 0,
      type: null, // Ajusta esto según tu lógica
      pointId: this.pointSelected!.id,
      userIds: [this.user?.id],
      periodo: this.periodo ? parseInt(this.periodo) : null, // Convertir a número si es necesario
    };

    this.turnService.saveTurn$(request).subscribe({
      next: (res) => {
        Swal.fire("Éxito", "El turno se ha guardado correctamente.", "success");
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(err.error.error, err.error.message, "error");
      },
    });
  }

  parseTimeRange(range: string): { timeStart: string; timeEnd: string } {
    if (!range || !range.includes("-")) {
      console.log(range);
      throw new Error(`Formato de rango inválido`);
    }

    const [startRaw, endRaw] = range.split("-").map((s) => s.trim());

    const parseTime = (time: string): string => {
      // Soporta: "07:00 a. m.", "7:00 am", "07:00 PM", etc.
      const match = time.match(/(\d{1,2}):(\d{2})\s*(a\.?\s*m\.?|p\.?\s*m\.?|am|pm)/i);

      if (!match) {
        throw new Error(`Formato inválido: ${time}`);
      }

      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const period = match[3].toLowerCase();

      // Conversión a 24h
      if ((period.includes("p") || period === "pm") && hours !== 12) {
        hours += 12;
      }

      if ((period.includes("a") || period === "am") && hours === 12) {
        hours = 0;
      }

      return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
    };

    return {
      timeStart: parseTime(startRaw),
      timeEnd: parseTime(endRaw),
    };
  }
}

export function formatToYYYYMMDD(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
