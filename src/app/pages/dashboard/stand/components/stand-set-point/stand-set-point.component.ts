import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PointsService } from '../../../points/services/api/points.service';
import { Point } from '../../../points/interfaces/point.interfaces';
import { Stand } from '../../interfaces/stand.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StandApiService } from '../../services/api/stand-api.service';
import { DataService } from '../../../../../core/services/data/data.service';

@Component({
  selector: 'app-stand-set-point',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './stand-set-point.component.html',
  styleUrl: './stand-set-point.component.css',
  standalone: true
})
export class StandSetPointComponent implements OnInit {
  points: Point[] = []
  @Input() stand!: Stand;
  point!: Point
  constructor(
    private pointsService: PointsService,
    private standApiService: StandApiService,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.pointsService.getAllPoints$().subscribe(
      data => {
        this.points = data
      }
    )
  }
  onSubmit() {
    const body = {
      ...this.stand,
    }
    console.log(body);
    this.standApiService.assign$(body).subscribe(data => {
      const message = { severity: 'contrast', summary: 'Guardar', detail: 'Datos Guardados', life: 3000 }
      this.dataService.addToas$(message)
      console.log(data);
    }, error=>{
      const message = { severity: 'contrast', summary: 'Error', detail: 'No se guardaron los datos', life: 3000 }
      this.dataService.addToas$(message)
    })
  }
}
