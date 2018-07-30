import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { environmentProd } from './../../environments/environment.prod';
import { Session } from "../helper/session";


@Injectable()
export class LoginService {

  constructor(private _router: Router, private http: Http,private session: Session) { }
  public BASE_URL: string = environment.config.BASE_URL;

  signup(userDetails) {
    return this.http.post(`${this.BASE_URL}user/usersignup`, { userDetails }).
      toPromise().then((res: Response) => res.json());
  }

  login(data) {
    return this.http.post(`${this.BASE_URL}user/weblogin`, { data }).
      toPromise().then((res: Response) => res.json());
  }                                                                                                                                                                                               

  getDetails(token) {
    return this.http.get(`${this.BASE_URL}user/userdetails/${token}`).
      toPromise().then((res: Response) => res.json());
  }

  logoutUser(email) {
    return this.http.get(`${this.BASE_URL}user/logout/${email}`).
      toPromise().then((res: Response) => res.json());
  }

  validateUser(email)
  {
    return this.http.get(`${this.BASE_URL}user/validateUser/${email}`).
    toPromise().then((res: Response) => res.json());

  }

  setSession(data) {
   
    localStorage.user_login = JSON.stringify(data);
    this.session.setCookie('session', JSON.stringify(data), 30);
    return true;
  }

  isAuth() {
    if (localStorage.user_login) {
      var login_data = JSON.parse(localStorage.user_login);

      if (1 && login_data.role == 'user') {

        return true;
      }
      else {
        // this.logout();
        return false;
      }
    }
    else {
      return false;
    }

  }

  isSuperAuth() {
    //console.log(JSON.parse(localStorage.user_login).type);
    if (localStorage.user_login) {

      if (JSON.parse(localStorage.user_login).role == 'superadmin') {
        return true;
      } else {
        return false;
      }
    }
  }

  updatePassword(userInfo)
  {
    return this.http.post(`${this.BASE_URL}user/updatePassword`, { userInfo }).
    toPromise().then((res: Response) => res.json());

  }

}
