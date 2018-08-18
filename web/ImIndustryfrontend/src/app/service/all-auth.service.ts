import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { LoginService } from "./../login/login.service";

@Injectable()
export class AllAuthService {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isAuth()) {
      return true;
    }else if(this.loginService.isSuperAuth()){
      return true;
    } else {
      this.router.navigate(['/']);
    }

  }

}