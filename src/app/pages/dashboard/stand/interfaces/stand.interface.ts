import { Congregation } from "../../congregations/interfaces/congregation.interface";
import { Point } from "../../points/interfaces/point.interfaces";

export interface Stand {
  id: number;
  type: string;
  status: string;
  observations: string;
  poster: string;
  congregation: Congregation;
  inventory: Inventory;
  point: Point
}

export interface Inventory {
  id: number;
  title: string;
  stock: number;
  type: string;
  updatedAt: string;
}

