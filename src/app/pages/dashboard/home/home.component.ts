import { Component } from '@angular/core';
import { RoutesEnums } from '../../../core/enums/router.enums';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  constructor(private router: Router){}
  routes = RoutesEnums
  items =[
    {
      img: "img/cart.png",
      title: "Solicitar Turno",
      path: RoutesEnums.TURNS
    },
       {
      img: "img/map.png",
      title: "Ver Mapa",
      path: RoutesEnums.POINT_MAPS
    },
       {
      img: "img/statistics.png",
      title: "Ver Estadisticas",
      path: RoutesEnums.STATISTICS
    }
  ]
  goTo(destiny: string){
    console.log("click");
    this.router.navigateByUrl(`/sistema/${destiny}`)
  }
}
