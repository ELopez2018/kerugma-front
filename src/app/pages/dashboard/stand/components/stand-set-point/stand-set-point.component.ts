import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointsService } from '../../../points/services/api/points.service';
import { Point } from '../../../points/interfaces/point.interfaces';
import { Stand } from '../../interfaces/stand.interface';
import { StandApiService } from '../../services/api/stand-api.service';
import { DataService } from '../../../../../core/services/data/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stand-set-point',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './stand-set-point.component.html',
  styleUrl: './stand-set-point.component.css',
})
export class StandSetPointComponent implements OnInit {
  @Input({ required: true }) stand!: Stand;

  points: Point[] = [];
  isSubmitting = false;

  constructor(
    private readonly pointsService: PointsService,
    private readonly standApiService: StandApiService,
    private readonly dataService: DataService
  ) { }

  ngOnInit(): void {
    this.pointsService.getAllPoints$().subscribe({
      next: (data) => (this.points = data || []),
      error: () => this.showToast('Error', 'No se pudieron cargar los puntos'),
    });
  }

  onSubmit(): void {
    if (!this.stand?.point) {
      this.showToast('Advertencia', 'Debe seleccionar un punto antes de asignar');
      return;
    }

    this.isSubmitting = true;

    const body = { ...this.stand };

    this.standApiService
      .assign$(body)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => this.showToast('Guardar', 'Datos guardados correctamente'),
        error: () => this.showToast('Error', 'No se guardaron los datos'),
      });
  }

  private showToast(summary: string, detail: string): void {
    this.dataService.addToas$({
      severity: 'contrast',
      summary,
      detail,
      life: 3000,
    });
  }
}
