import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Congregation } from '../../../congregations/interfaces/congregation.interface';
import { Stand } from '../../interfaces/stand.interface';

@Injectable({
  providedIn: 'root'
})
export class StandApiService {

  apiUrl = `${environment.SERVER}/stands`
  constructor(private httpClient: HttpClient) { }

  public getAllStands$() {
    return this.httpClient.get<Stand[]>(this.apiUrl)
  }

  public create$(body: Stand) {
    return this.httpClient.post<Stand>(this.apiUrl, body)
  }
}
