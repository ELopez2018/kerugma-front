import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CookiesEnums } from '../../../../core/enums/app.enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = environment.SERVER;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public login(body: any) {
    const url = `${this.server}/auth/login`
    return this.http.post(url, body, { observe: 'response' })
      .pipe(
        tap(response => {
          const headers = response.headers;
          const token = headers.get('Authorization') || "";
          this.cookieService.set(CookiesEnums.AUTH_TOKEN, token, 1, '/', '', true, "Strict");
          return response
        })
      )
  }
}
