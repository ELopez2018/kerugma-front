import { Component, inject, OnInit } from '@angular/core';
import { RoutesEnums } from '../../../core/enums/router.enums';
import { Router, RouterModule } from '@angular/router';
import { CalendarComponent, } from "../calendar/calendar.component";
import { TurnService } from '../turn/core/service/api/turn.service';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent implements OnInit {
  turnService = inject(TurnService);
  constructor(private router: Router){}
  shifts: any[] = [];
  ngOnInit(): void {
    this.turnService.getAllTurnAvailables$().subscribe((data) => {
      console.log(data);
      this.shifts = data.map(turn => ({
        id: turn.id,
        date: turn.date,
        timeStart: turn.timeStart,
        timeEnd: turn.timeEnd,
        users: turn.users
      }));
    });
  }
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
    this.router.navigateByUrl(`/sistema/${destiny}`)
  }
}
