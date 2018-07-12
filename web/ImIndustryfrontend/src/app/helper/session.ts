import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from "ngx-cookie";

@Injectable()
export class Session {

  constructor(private cookie: CookieService) {

  }

  setCookie(key, value, time) {
    let exp = new Date();
    exp.setMinutes(exp.getMinutes() + 30);
    let cookieOptions = { expires: exp } as CookieOptions;
    this.cookie.put(key, value, cookieOptions);
  }

  getCookie(key) {
    return this.cookie.get(key);
  }

  setLongCookie(key, value) {
    let exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1, exp.getMonth(), exp.getDate());
    let cookieOptions = { expires: exp } as CookieOptions;
    this.cookie.put(key, JSON.stringify(value), cookieOptions);
  }

  deleteCookie(key) {
    this.cookie.remove(key);
  }

  checkCookie(key) {

  }

}
