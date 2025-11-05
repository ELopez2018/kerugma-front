import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../../environments/environment';
import { Inventory } from '../../../../interfaces/stand.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {
  apiUrl = `${environment.SERVER}/inventario`
  constructor(private httpClient: HttpClient) {

  }
  public savePoint$(body: Inventory) {
    const url = `${this.apiUrl}`
    return this.httpClient.post<Inventory>(url, body)
  }
  public update$(body: Inventory, id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.httpClient.put<Inventory>(url, body)
  }
  public save$(body: Inventory) {
     const url = `${this.apiUrl}`
    return this.httpClient.post<Inventory>(url, body)
  }

  getAll$(){
     const url = `${this.apiUrl}`
    return this.httpClient.get<Inventory[]>(url)
  }
  delete$(id: number){
    const url = `${this.apiUrl}/${id}`
     return this.httpClient.delete<Inventory[]>(url)
  }
}
