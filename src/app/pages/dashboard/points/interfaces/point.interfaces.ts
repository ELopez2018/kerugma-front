export interface Point {
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
  stands: any[];
  schedule: Schedule[];
}

interface Schedule {
  id: number;
  schedule: string;
  enable: boolean;
}

interface Congregation {
  id: number;
  name: string;
  number: string;
}
