import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../interfaces/point.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points-card',
  imports: [ CommonModule],
  templateUrl: './points-card.component.html',
  styleUrl: './points-card.component.css',
  standalone: true
})
export class PointsCardComponent {
@Output() onPointSelect  = new EventEmitter<Point>()
@Input() point!: Point
@Input() showButton: boolean = true;
@Input() textButton ="Seleccionar";
onSelected(point: Point){
  this.onPointSelect.emit(point)
}
parceImage(image: string){
  return image || image !=="" ? image: "img/cart.png"
}
}
