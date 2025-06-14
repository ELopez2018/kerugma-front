import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoutesEnums } from './core/enums/router.enums';
import { AuthGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: "", redirectTo:RoutesEnums.LOGIN, pathMatch: "full"
  },
  {
    path: RoutesEnums.LOGIN, component: LoginComponent
  },
  {
    path: RoutesEnums.DASHBOARD, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
  },
];
