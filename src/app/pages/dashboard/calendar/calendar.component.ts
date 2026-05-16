import { CommonModule } from "@angular/common";
import { Component, computed, EventEmitter, inject, Input, OnInit, Output, signal } from "@angular/core";
import { TurnService } from "../turn/core/service/api/turn.service";

/**
 * Componente de calendario simple.
 * Muestra un calendario mensual, permite seleccionar fechas y resalta días especiales.
 * Ideal para principiantes: el código es claro y cada función tiene un propósito sencillo.
 */
export interface CalendarDay {
  date: Date;
  dayNumber: number;
  currentMonth: boolean;
  weekend: boolean;
  holiday: boolean;
  blocked: boolean;
  today: boolean;
}

/**
 * Colores para los diferentes tipos de días en el calendario.
 * Puedes personalizarlos desde el componente padre.
 */
export interface CalendarColors {
  /** Color para los días festivos */
  holiday: string;
  /** Color para los fines de semana */
  weekend: string;
  /** Color para los días laborales */
  workday: string;
  /** Color para los días bloqueados */
  blocked: string;
  /** Color para el día de hoy */
  today: string;
}

@Component({
  selector: "app-calendar",
  imports: [CommonModule],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.css",
})
export class CalendarComponent implements OnInit {
  /**
   * Inicializa el componente. Aquí puedes cargar datos si es necesario.
   */
  ngOnInit(): void {
   
  }

  /**
   * Lista de fechas festivas en formato 'YYYY-MM-DD'.
   */
  @Input() holidays: string[] = ['2026-05-18'];

  /**
   * Lista de fechas bloqueadas en formato 'YYYY-MM-DD'.
   */
  @Input() blockedDates: string[] = ['2026-05-18'];

  /**
   * Colores personalizados para el calendario.
   */
  @Input() colors: CalendarColors = {
    holiday: "#ef4444",
    weekend: "#22c55e",
    workday: "#facc15",
    blocked: "#9ca3af",
    today: "#3b82f6",
  };

  /**
   * Evento que se emite cuando el usuario selecciona una fecha.
   */
  @Output() dateSelected = new EventEmitter<Date>();

  /**
   * Fecha actual mostrada en el calendario.
   */
  currentDate = signal(new Date());

  /**
   * Nombres de los días de la semana.
   */
  weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  /**
   * Nombre del mes y año actual, por ejemplo: "mayo 2026".
   */
  monthName = computed(() => {
    return this.currentDate().toLocaleString("es-CO", {
      month: "long",
      year: "numeric",
    });
  });

  /**
   * Lista de días a mostrar en el calendario.
   */
  days = computed(() => {
    return this.generateCalendar();
  });

  /**
   * Cambia el calendario al mes anterior.
   */
  previousMonth(): void {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() - 1);
    this.currentDate.set(date);
  }

  /**
   * Cambia el calendario al mes siguiente.
   */
  nextMonth(): void {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() + 1);
    this.currentDate.set(date);
  }

  /**
   * Selecciona una fecha si no está bloqueada ni es de otro mes.
   * @param day Día seleccionado por el usuario
   */
  selectDate(day: CalendarDay): void {
    if (day.blocked || !day.currentMonth) {
      return;
    }
    this.dateSelected.emit(day.date);
  }

  /**
   * Genera la lista de días a mostrar en el calendario, incluyendo días de otros meses para completar la cuadrícula.
   * @returns Lista de objetos CalendarDay
   */
  private generateCalendar(): CalendarDay[] {
    const current = this.currentDate();
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const calendar: CalendarDay[] = [];
    // Dias anteriores
    for (let i = startWeekDay; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      calendar.push(this.createDay(date, false));
    }
    // Dias del mes
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      calendar.push(this.createDay(date, true));
    }
    // Completar 42 celdas
    while (calendar.length < 42) {
      const nextDay = calendar.length - totalDays - startWeekDay + 1;
      const date = new Date(year, month + 1, nextDay);
      calendar.push(this.createDay(date, false));
    }
    return calendar;
  }

  /**
   * Crea un objeto CalendarDay con la información de un día específico.
   * @param date Fecha del día
   * @param currentMonth Si el día pertenece al mes actual
   * @returns Objeto CalendarDay
   */
  private createDay(date: Date, currentMonth: boolean): CalendarDay {
    const formatted = this.formatDate(date);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const holiday = this.holidays.includes(formatted);
    const blocked = this.blockedDates.includes(formatted);
    const today = this.isToday(date);
    return {
      date,
      dayNumber: date.getDate(),
      currentMonth,
      weekend,
      holiday,
      blocked,
      today,
    };
  }

  /**
   * Convierte una fecha a formato 'YYYY-MM-DD'.
   * @param date Fecha a formatear
   * @returns Fecha en formato string
   */
  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  /**
   * Verifica si la fecha dada es hoy.
   * @param date Fecha a comparar
   * @returns true si es hoy, false si no
   */
  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  /**
   * Devuelve los estilos CSS para un día según su tipo (bloqueado, festivo, fin de semana, etc).
   * @param day Día del calendario
   * @returns Objeto con estilos CSS
   */
  getDayStyles(day: CalendarDay): any {
    if (day.blocked) {
      return {
        background: this.colors.blocked,
        color: "#fff",
      };
    }
    if (day.holiday) {
      return {
        background: this.colors.holiday,
        color: "#fff",
      };
    }
    if (day.weekend) {
      return {
        background: this.colors.weekend,
        color: "#fff",
      };
    }
    return {
      background: this.colors.workday,
      color: "#000",
    };
  }
}
