import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Congregation } from '../../../congregations/interfaces/congregation.interface';
import { Designation } from '../../interfaces/designation.interface';

@Injectable({
  providedIn: 'root'
})
export class DesignationApiService {
 apiUrl = `${environment.SERVER}/nombramientos`
  constructor(private httpClient: HttpClient) { }
  public getAllDesignations$() {
    return this.httpClient.get<Designation[]>(this.apiUrl)
  }

}
