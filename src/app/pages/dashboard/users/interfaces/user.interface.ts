import { Congregation } from "../../congregations/interfaces/congregation.interface";
import { Designation } from "../../designation/interfaces/designation.interface";

export interface User {
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
  congregation: Congregation;
  designations: Designation[];
}



export interface CreateCredential {
  id: number;
  username: string;
  password: string;
  locked: boolean;
  disabled: boolean;
  user: User;
}


