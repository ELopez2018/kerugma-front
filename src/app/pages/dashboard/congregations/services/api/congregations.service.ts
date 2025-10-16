import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Congregation } from '../../interfaces/congregation.interface';
import { tap } from 'rxjs';
import { CongregationDataService } from '../data/congregation-data.service';

@Injectable({
  providedIn: 'root'
})
export class CongregationsApiService {
  apiUrl = `${environment.SERVER}/congregaciones`
  constructor(
    private httpClient: HttpClient,
    private congregationDataService: CongregationDataService
  ) { }

  public getAllCongregations$() {
    return this.httpClient.get<Congregation[]>(this.apiUrl)
      .pipe(tap(data => {
        this.congregationDataService.setCongregations(data)
      }))
  }

  public create$(body: Congregation) {
    return this.httpClient.post<Congregation>(this.apiUrl, body)
  }

  public delete$(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.httpClient.delete<boolean>(url)
  }
}
