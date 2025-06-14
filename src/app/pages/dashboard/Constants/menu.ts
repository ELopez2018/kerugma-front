import { RoutesEnums } from "../../../core/enums/router.enums";
import { TurnComponent } from '../turn/turn.component';

export const MenuData = [
  {
    key: "1",
    label: "Inicio",
    data: RoutesEnums.HOME,
    icon: "pi pi-home",
    children: [
    ]
  },
  {
    key: "2",
    label: "Congregaciones",
    data: RoutesEnums.CONGREGATIONS,
    icon: "pi pi-building-columns",
    children: [
    ]
  },
  {
    key: "3",
    label: "Usuarios",
    data: RoutesEnums.USERS,
    icon: "pi pi-users",
    children: [
    ]
  },
   {
    key: "4",
    label: "Carritos",
    data: RoutesEnums.STANDS,
    icon: "pi pi-shopping-cart",
    children: [
    ]
  },
  {
    key: "4",
    label: "Puntos",
    data: RoutesEnums.POINTS,
    icon: "pi pi-map-marker",
    children: [
    ]
  },
  {
    key: "5",
    label: "Mis turnos",
    data: RoutesEnums.TURNS,
    icon: "pi pi-list-check",
    children: [
    ]
  },
  {
    key: "6",
    label: "Estadisticas",
    data:  RoutesEnums.STATISTICS,
    icon: "pi pi-chart-bar",
    children: [
    ]
  },
  {
    key: "7",
    label: "Mapa",
    data:  RoutesEnums.POINT_MAPS,
    icon: "pi pi-map",
    children: [
    ]
  }
];
