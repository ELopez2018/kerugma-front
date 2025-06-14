// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { RoutesEnums } from '../../core/enums/router.enums';
import { PointsComponent } from './points/points.component';
import { UsersComponent } from './users/users.component';
import { CongregationsComponent } from './congregations/congregations.component';
import { TurnComponent } from './turn/turn.component';
import { PoinsMapComponent } from './poins-map/poins-map.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StandComponent } from './stand/stand.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: RoutesEnums.POINTS, component: PointsComponent
      },
      {
        path: RoutesEnums.USERS, component: UsersComponent
      },
      {
        path: RoutesEnums.CONGREGATIONS, component: CongregationsComponent
      },
      {
        path: RoutesEnums.TURNS, component: TurnComponent
      },
      {
        path: RoutesEnums.POINT_MAPS, component: PoinsMapComponent
      },
      {
        path: RoutesEnums.STATISTICS, component: StatisticsComponent
      },
      {
        path: RoutesEnums.STANDS, component: StandComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
