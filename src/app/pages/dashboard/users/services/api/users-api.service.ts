import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CreateCredential, User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private apiUrl = `${environment.SERVER}/usuarios`
  private apiUrlCredentials = `${environment.SERVER}/auth/credenciales`
  constructor(private httpClient: HttpClient) { }

  public getAllUsers$() {
    return this.httpClient.get<User[]>(this.apiUrl)
  }
  public create$(body: User) {
    return this.httpClient.post<User>(this.apiUrl, body)
  }

  public createCredentials$(body: CreateCredential) {
    return this.httpClient.post<User>(this.apiUrlCredentials, body)
  }

  public userDelete$(body: User) {
    const url = `${this.apiUrl}/${body.id}`;
    return this.httpClient.delete<User>(url)
  }

    public userApproval$(body: User) {
    const url = `${this.apiUrl}/approval`;
    return this.httpClient.patch<User>(url, body)
  }
}
