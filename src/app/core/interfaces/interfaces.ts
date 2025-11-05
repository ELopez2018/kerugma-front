import { Stand } from "../../pages/dashboard/stand/interfaces/stand.interface";

export interface ItemInventory {
  id?: any;
  title: string;
  stock: number;
  type: string;
  updatedAt: string;
  stand: Stand | null |undefined;
}

