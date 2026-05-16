
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RoutesEnums } from '../../core/enums/router.enums';
import { MenuData } from './Constants/menu';
import { CookieService } from 'ngx-cookie-service';
import { CookiesEnums } from '../../core/enums/app.enums';
import { LocalStorageEnums } from '../../core/enums/localstorage.enum';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
  encapsulation: ViewEncapsulation.None // <- importante
})
export class DashboardComponent implements OnInit {
  collapsed = false;
  public routes = RoutesEnums
  public qty: number = 0
  public menu: any[] = MenuData;
  public toggleMenu = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.dataService.getToas$().subscribe(data => {
      this.messageService.add(data)
    })

  }

  onMenuSelect(event: any) {
    this.toggleMenu = false;
    switch (event.node.label) {
      case "STORES":
        // this.router.navigateByUrl(`/${RoutesEnums.WAREHOUSES}`)
        break;
      case "SALE":
        // this.router.navigateByUrl(`/${RoutesEnums.STORE}/sale`)
        break;
      default:
        this.router.navigateByUrl(`${RoutesEnums.DASHBOARD}/${event.node.data}`)
        break;

    }
  }

  logOut() {
    this.cookieService.delete(CookiesEnums.AUTH_TOKEN, '/', '', true, 'Strict');
    localStorage.removeItem(LocalStorageEnums.USER)
    this.router.navigateByUrl(RoutesEnums.LOGIN)
  }
}
export interface MenuResponsive {
  key: string;
  label: string;
  data: string;
  icon: string;
  children?: Child2[];
}

interface Child2 {
  key: string;
  label: string;
  data: string;
  icon: string;
  children?: Child[];
}

interface Child {
  key: string;
  label: string;
  icon: string;
  data: string;
}
/*
success	Mensaje de éxito o confirmación.	✅ “Operación realizada correctamente.”
info	Información general o notificación.	ℹ️ “Actualización disponible.”
warn	Advertencia, algo a revisar.	⚠️ “Campos incompletos.”
error	Error o fallo en la operación.	❌ “Error al guardar los datos.”
secondary (opcional)	Algunos temas personalizados lo incluyen, estilo neutro.	—
contrast (opcional)	En temas recientes de PrimeNG, sirve para mensajes de alto contraste.
*/
