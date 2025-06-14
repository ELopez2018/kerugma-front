import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookiesEnums } from '../../enums/app.enums';
import { RoutesEnums } from '../../enums/router.enums';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper: JwtHelperService = new JwtHelperService()
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(): boolean {
    const token = this.cookieService.get(CookiesEnums.AUTH_TOKEN);
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate([RoutesEnums.LOGIN]);
      return false;
    }
  }
}
