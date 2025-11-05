import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Point } from '../../interfaces/point.interfaces';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  server = environment.SERVER
  constructor(private httpClient: HttpClient) { }

  public getAllPoints$() {
    const url = `${this.server}/puntos`
    return this.httpClient.get<Point[]>(url)
  }

  public savePoint$(body: Point) {
    const url = `${this.server}/puntos`
    return this.httpClient.post<Point>(url, body)
  }

}
