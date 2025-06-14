import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesEnums } from '../enums/app.enums';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)
  const token = cookieService.get(CookiesEnums.AUTH_TOKEN)
  const authReq = req.clone({
    headers: new HttpHeaders({
      Authorization: token,
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json"
    })
  });
  return next(authReq);
};
