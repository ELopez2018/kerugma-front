import { Point } from "../../pages/dashboard/points/interfaces/point.interfaces";
import { Stand } from "../../pages/dashboard/stand/interfaces/stand.interface";
import { User } from "../../pages/dashboard/users/interfaces/user.interface";

export interface ItemInventory {
  id?: any;
  title: string;
  stock: number;
  type: string;
  updatedAt: string;
  stand: Stand | null |undefined;
}

export type InventoryType = 'REVISTA' | 'TRATADO' | 'FOLLETO' | 'LIBRO' | null; // Agrega más tipos según tu necesidad
// ⚠️ Ajusta estos valores exactamente a tu enum en backend

export interface TurnRequestDTO {
  date: string;          // formato: yyyy-MM-dd
  timeStart: string;     // formato: HH:mm:ss
  timeEnd: string;       // formato: HH:mm:ss
  status: string;
  observations?: string;
  placements?: number;
  type: InventoryType;
  pointId: number;
  userIds?: any[];
  periodo?: number | null |undefined; // Agrega el campo periodo
}

export interface ErrorRequest {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
}


export interface TurnResponseDTO {
  id: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: string;
  observations: string;
  placements: number;
  type: null;
  point: Point;
  users: User[];
}
/*
interface User {
  id: number;
  fullName: string;
  image: string;
  firstName: string;
  secondName: string;
  lastName: string;
  surname: string;
  birthdate: string;
  gender: string;
  documentNumber: number;
  documentType: string;
  cellPhone: string;
  phone: string;
  approved: string;
  email: string;
  createBy: Congregation;
  congregation: Congregation;
  designations: Designation[];
  deletedAt: null;
}

interface Designation {
  id: number;
  description: string;
}

interface Point {
  id: number;
  title: string;
  address: string;
  state: string;
  municipality: string;
  city: string;
  neighborhood: string;
  benchmark: string;
  status: string;
  pictures: string;
  latitud: number;
  longitud: number;
  congregation: Congregation;
  stands: Stand[];
  schedule: Schedule[];
}

interface Schedule {
  id: number;
  schedule: string;
  enable: boolean;
}

interface Stand {
  id: number;
  type: string;
  status: string;
  observations: string;
  poster: string;
  enable: null;
  congregation: Congregation;
  inventories: Inventory[];
  deletedAt: null;
}

interface Inventory {
  id: number;
  title: string;
  stock: number;
  type: string;
  updatedAt: string;
}

interface Congregation {
  id: number;
  name: string;
  number: string;
}
  */